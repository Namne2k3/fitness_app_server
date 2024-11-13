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
            const newRoom = new Room({
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