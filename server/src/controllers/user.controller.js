const User = require('../models/user.model');
const fileControl = require('../utils/file.control');

const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.find(id);

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved the user.',
            data: user,
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved all the users.',
            data: users,
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
};

const addUser = async (req, res) => {
    const { account, password, phone, name } = req.body;
    try {
        var avatarpath = null;
        if(req.files) {
            let file = req.files.avatar;
            avatarpath = fileControl.uploadFile("/avatar", file);
        }

        const user = new User(account, password, phone, name, avatarpath);
        await user.save();

        res.status(201).send({
            statusCode: 201,
            statusMessage: 'Created',
            message: 'Successfully created a user.',
            data: null,
        });
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { account, password, phone, name } = req.body;
    try {
        const user = await User.find(id);
        if(user == null) {
            return res.status(200).send({
                statusCode: 403,
                statusMessage: 'Resource not fould',
                message: null,
                data: null,
            });
        }
        var avatarpath = null;
        if(req.files) {
            let file = req.files.avatar;
            avatarpath = fileControl.uploadFile("/avatar", file);
            req.body.avatar = avatarpath;
            fileControl.deletefile(user[0].avatar);
        }

        await User.update(id, req.body);

        return res.status(202).send({
            statusCode: 202,
            statusMessage: 'Accepted',
            message: 'Successfully updated a user.',
            data: null,
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null,});
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.delete(id);

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully deleted a user.',
            data: null,
        });
    } catch (err) {
        res.status(500).send({statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null});
    }
};

module.exports = {
    getUser,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
};
