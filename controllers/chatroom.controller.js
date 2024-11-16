import Message from "../models/message.model.js"
import Room from "../models/room.model.js"

export const createNewChatRoom = async (req, res) => {
    try {
        const newRoom = new Room(req.body)

        const saved = await newRoom.save()

        res.status(200).json({ message: "Create New Chatroom Successfully!", data: saved })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllMessagesByRoomId = async (req, res) => {
    try {

        const messages = await Message.find({ roomId: req.params.roomId })
        if (!messages) {
            res.status(4040).json({ message: 'No messages found!' })
        }

        res.status(200).json({ message: "Create New Message Successfully!", data: messages })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createNewMessage = async (req, res) => {
    try {

        console.log("Check req.body >>> ", req.body);
        const newMessage = new Message(req.body)
        console.log("Check newMessage >>> ", newMessage);

        const saved = await newMessage.save()
        console.log("Check saved >>> ", saved);

        res.status(200).json({ message: "Create New Message Successfully!", data: saved })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllRooms = async (req, res) => {
    try {

        const userId = req.user.id


        const rooms = await Room.find({ members: userId })
            .populate({ path: 'members', select: 'username image' })
            .populate('lastMessage.senderId', 'username image')
            .lean()

        const formattedRooms = rooms.map((room) => {
            if (room.roomType == 'private') {
                const otherMember = room.members.find((member) => member._id.toString() !== userId.toString())
                return {
                    ...room,
                    roomName: otherMember.username || 'Unknown User',
                    roomImage: otherMember.image
                }
            }

            return room
        })
        res.status(200).json({ message: 'Get All Rooms Successfully', data: formattedRooms });
    } catch (error) {
        res.status(500).json({ message: 'Get All Rooms Occurred Error', error: error.message });
    }
}

export const findChatRoomByQueries = async (req, res) => {
    try {
        const { userId, userProfileId } = req.query

        const foundChatRoom = await Room.findOne({
            roomType: 'private',
            members: {
                $all: [userId, userProfileId]
            }
        })

        if (foundChatRoom) {
            res.status(200).json({ message: "Get Chatroom Successfully!", data: foundChatRoom })
        } else {
            const roomId = [userId, userProfileId].sort().join("_");
            const newRoom = new Room({
                _id: roomId,
                roomType: "private",
                members: [userId, userProfileId],
                createdBy: userId
            })

            const saved = await newRoom.save()

            res.status(200).json({ message: "Create New Chatroom Successfully!", data: saved })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

