import { User } from "@/types/user"
import moment from "moment"
import { AvatarImg } from "./AvatarImg"

export type MessageType= {
    from: User
    text: string
    createdAt: string
}

type MessagePropsType = {
    message: MessageType,
    currentUser: User,
    isSameRemitent?: boolean
}
export function Message({message, currentUser, isSameRemitent}: MessagePropsType) {

    return message.from.id === currentUser?.id ? (
        <div key={`${message.from.id}-${message.createdAt}`} data-soirce="you" className={`${isSameRemitent ? 'sameRemitent' : ''} flex gap-2.5 justify-end`}>
            <div className="">
                <div className="grid mb-2">
                    <h5 className="remitent text-right text-gray-900 text-sm font-semibold leading-snug pb-1">Yo</h5>
                    <div className="px-3 py-2 bg-indigo-600 rounded">
                        <h2 className="text-white text-sm font-normal leading-snug">{message.text}</h2>
                    </div>
                    <div className="justify-start items-center inline-flex">
                        <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">{moment(message.createdAt).fromNow()}</h3>
                    </div>
                </div>
            </div>
            <AvatarImg user={ currentUser }/>
        </div>
    ) : (
        <div key={`${message.from.id}-${message.createdAt}`} data-soirce="friend" className={`${isSameRemitent ? 'sameRemitent' : ''} grid`}>
            <div className="flex gap-2.5 mb-4">
                <AvatarImg user={ message.from }/>
                <div className="grid">
                    <h5 className="remitent text-gray-900 text-sm font-semibold leading-snug pb-1">{message.from.name} {message.from.lastname}</h5>
                    <div className="w-max grid">
                        <div className="px-3.5 py-2 bg-gray-100 rounded justify-start  items-center gap-3 inline-flex">
                            <h5 className="text-gray-900 text-sm font-normal leading-snug">{message.text}</h5>
                        </div>
                        <div className="justify-end items-center inline-flex mb-2.5">
                            <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">{moment(message.createdAt).fromNow()}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}