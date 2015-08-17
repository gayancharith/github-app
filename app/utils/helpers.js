// var axios = require('axios');
import axios from 'axios';

function getRepos(username) {
    return axios.get(`https://api.github.com/users/${username}/repos`);
}

function getUserDetails(username) {
    return axios.get(`https://api.github.com/users/${username}`);
}

var helpers = {
    getGithubInfo(username) {
        return axios.all([getRepos(username), getUserDetails(username)])
            .then((arr) => {
                return {
                    repos: arr[0].data,
                    bio: arr[1].data
                }
            });

    }
};

// module.exports = helpers;
export default helpers;
