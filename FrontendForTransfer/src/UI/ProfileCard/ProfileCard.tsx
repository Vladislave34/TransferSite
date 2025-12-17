import {type FC, } from "react";

import type IUser from "../../models/User/IUser.ts";
import API_ENV from "../../env";


interface ProfileCardProps {
    profile: IUser;
}

const ProfileCard:FC<ProfileCardProps> = ({profile}) => {
    return (
        <div className="
    rounded-2xl
    bg-gradient-to-b
    from-[#CDB4DB]
    via-[#FFC8DD]
    to-[#A2D2FF]
    border border-white/20
    p-5
">
            <div className="w-40 h-40 rounded-full overflow-hidden mx-auto ">
                <img
                    src={`${API_ENV.API_BASE_URL}/images/${profile.image}`}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col font-semibold gap-8  mt-10   ">
                <div className='flex flex-row justify-between gap-12  border-b-2 py-4'>
                    <span>Full Name</span>
                    <span>{profile.fullName}</span>
                </div>
                <div className='flex flex-row justify-between gap-12 border-b-2 py-4'>
                    <span>Email</span>
                    <span>{profile.email}</span>
                </div>

            </div>
        </div>
    );
};

export default ProfileCard;