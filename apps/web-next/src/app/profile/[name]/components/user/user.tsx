"use server";

import { BedrockText } from "@/_components/bedrock-text";
import { Card } from "@/_components/card";
import { UserLinkvertiseInfo } from "@/app/profile/[name]/components/user/user-linkvertise-info";

import {
  styles,
  UserProfileActions,
  UserProfileName,
  UserProfilePicture,
  UserProfileRating,
} from ".";

import clsx from "clsx";
import { SimpleUserDto, UserRatingDto } from "@/_lib/api";

interface UserProps {
  selectedUser: SimpleUserDto;
  rating: UserRatingDto;
}

export const User = async ({ selectedUser, rating }: UserProps) => {
  return (
    <>
      <UserLinkvertiseInfo selectedUser={selectedUser} />
      <Card className={styles.card}>
        <div className={styles.profile}>
          <UserProfilePicture name={selectedUser!.name} />
          <div className={styles.info}>
            <div className={styles.header}>
              <UserProfileName
                name={selectedUser!.name}
                banned={selectedUser!.banned}
              />
              <UserProfileActions selectedUser={selectedUser} />
            </div>
            <UserProfileRating rating={rating} />
            <BedrockText
              type="p"
              text={selectedUser!.bio}
              color="white"
              textAlign="left"
              extraClassName={clsx(styles.text, styles.wrap)}
            />
          </div>
        </div>
        <div className={styles.bio}>
          <BedrockText
            type="p"
            text={selectedUser!.bio}
            color="white"
            textAlign="left"
            extraClassName={styles.wrap}
          />
        </div>
      </Card>
    </>
  );
};
