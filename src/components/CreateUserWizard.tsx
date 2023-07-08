import React from "react";
import { useUser } from "@clerk/nextjs";

const CreateUserWizard = () => {
  const { user } = useUser();
  if (!user) return null;


  return (
    <div className="flex w-full gap-4">
      <img
        src={user.profileImageUrl}
        alt={`@${user.firstName}'s profile picture`}
        className="ml-1 mr-1 h-12 w-12 rounded-full"
      />
      {/* <div>Hello, {user.firstName} welcome to Clerk</div>; */}
      {/* <input placeholder="Type some text" className="bg-transparent"></input> */}
    </div>
  );
};

export default CreateUserWizard;
