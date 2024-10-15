const { getUserContacts, getMessages, addMessage } = require('../dao/chatDAO');
const { getAllUserChatDAO, makeChatDAO } = require('../dao/shipper/chatDAO');

const getUserContactsHandler = async (req, res) => {
    try {
        const userContacts = await getUserContacts();

        return res.status(200).json({ success: true, data: userContacts });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getMessagesHandler = async (req, res) => {
    const { userID } = req.params;
    const { datetime } = req.query;

    try {
        let time

        if (datetime) {
            time = new Date(datetime);
        } 

        const messages = await getMessages(userID, time);

        return res.status(200).json({ success: true, data: messages });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const addMessageHandler = async (req, res) => {
    const messageAdd = req.body;
    const { userID } = req.params;

    try {
        await addMessage(messageAdd, userID);
        return res.status(201).json({ success: true, message: 'Message added successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//shipper
const getAllUserChat = async (req, res) => {
    try {
        const { shipperId } = req.params;
        const allUserChat = await getAllUserChatDAO(shipperId);

        if (!allUserChat) {
            return res.status(200).json({ success: true, data: [] });
        }

        return res.status(200).json({ success: true, data: allUserChat });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });   
    }
}

const makeChat = async (req, res) => {
    try {
        const { shipperId, userId } = req.body;
        await makeChatDAO(shipperId, userId);

        return res.status(200).json({ success: true, message: 'Tạo chat thành công' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    getUserContactsHandler,
    getMessagesHandler,
    addMessageHandler,
    getAllUserChat,
    makeChat
};
