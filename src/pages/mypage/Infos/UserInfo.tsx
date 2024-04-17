import DangerZone from "./comps/DangerZone";
import UserNickAndMail from "./comps/UserNickAndMail";
import UserPic from "./comps/UserPic";
import UserSites from "./comps/UserSites";

export default function UserInfo() {
    return (
        <div className="info">
            <UserPic />
            <UserNickAndMail />
            <UserSites />
            <DangerZone />
        </div>
    )
}