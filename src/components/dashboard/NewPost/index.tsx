"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import React from "react";

import {
  Connection,
  clusterApiUrl,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
  PublicKey,
} from "@solana/web3.js";


import RepeatIcon from "@/components/shared/icon/RepeatIcon";
import { uploadFolder } from "@/utils/irys";
import { SOCIAL_ADDRESS } from "@/config/constants";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";

const uploadPost = async (
  wallet: WalletContextState,
  content: string,
  images: File[],
) => {
  const extenstions = ["jpg", "jpeg", "png", "gif"];
  const imagesFile = images.filter((image) => {
    const ext = image.name.split(".").pop();

    if (!ext) return false;

    return extenstions.includes(ext);
  });

  if (!imagesFile) return;
  if (!wallet.publicKey) return;

  const uris = await uploadFolder(wallet, imagesFile);
  /*
  @todo: Need to convert to Solana
  */
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const payer = Keypair.generate();
  const transaction =
    new Transaction()
      .add(
        new TransactionInstruction({
          keys: [{ pubkey: wallet.publicKey, isSigner: true, isWritable: true }],
          programId: new PublicKey(SOCIAL_ADDRESS),
          data: Buffer.from(JSON.stringify({
            function: 'upload_post',
            functionArguments: [
              content,
              uris,
            ],
          })),
        }),
      );

  try {
    await sendAndConfirmTransaction(connection, transaction, [payer]);
  } catch (error) {
    console.error(error);
  }

  // wallet.signAndSubmitTransaction({
  //   data: {
  //     function: `${SOCIAL_ADDRESS}::social::upload_post`,
  //     functionArguments: [
  //       new MoveString(content),
  //       new MoveVector(uris.map((uri) => new MoveString(uri))),
  //     ],
  //   },
  // });
};

const NewPost = () => {
  const [content, setContent] = React.useState("");
  const [images, setImages] = React.useState<File[]>([]);
  const ref = React.useRef<HTMLInputElement>(null);
  const wallet = useWallet();

  return (
    <div className="p-4 bg-foreground-50 rounded-3xl">
      <div className="mb-4">
        <Textarea
          className="w-full resize-none overflow-hidden rounded-md"
          placeholder="Type something..."
          rows={1}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <RepeatIcon
            className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            height={24}
            width={24}
          />
          <Input
            ref={ref}
            multiple={true}
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                const files = Array.from(e.target.files);

                setImages(files);
              }
            }}
          />
          <label
            className="cursor-pointer"
            onClick={() => {
              if (ref.current) {
                ref.current.click();
              }
            }}
          >
            Choose file
          </label>
          {/* <LinkIcon
              className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              height={24}
              width={24}
          /> */}
        </div>
        <div>
          <Button
            color="primary"
            radius="full"
            onClick={(e) => {
              e.preventDefault();
              uploadPost(wallet, content, images);
            }}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
