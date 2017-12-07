import { User } from '../../models/user';
import { ProfileItem } from '../../models/profile/profile-item.interface';

export interface ProfileUserItem{
    user: User,
    profile: ProfileItem
}