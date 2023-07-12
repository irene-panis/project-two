const sequlize = require('../config/connection');
const { User, Project } = require('../models');

// requires the userData Json
const userData = require('');
// requires the projectData Json
const projectData = require('');

const seedDatabase = async () => {
    await sequlize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const project of projectData) {
        await Project.create({
            ...project,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();