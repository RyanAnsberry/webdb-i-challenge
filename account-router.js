const express = require('express');

const db = require('./data/dbConfig.js');

const router = express.Router();
// Get all accounts
router.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.json(accounts);
    })
    .catch(error => {
        res.status(500).json({ message: 'Failed to get accounts' })
    })
});

// Get account by id
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id })
    .then(accounts => {
        const account = accounts[0];

        if (account) {
            res.json(account);
        } else {
            res.status(404).json({ message: 'invalid account id' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Failed to get account' })
    })
});

// Create a new account
router.post('/', (req, res) => {
    const accountData = req.body;

    db('accounts').insert(accountData)
    .then(ids => {
        res.status(201).json({ newAccountId: ids[0] });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to insert account' });
    })
});

// Update existing account
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts').where({ id }).update(changes)
    .then(count => {
        if (count) {
            res.json({ updated: count })
        } else {
            res.status(404).json({ message: 'invalid account id' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Failed to update Account' })
    });
});

// Delete account
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id }).del()
    .then(count => {
        if (count) {
            res.json({ deleted: count })
        } else {
            res.status(404).json({ message: 'invali account id' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Failed to delete Account' })
    });
});

module.exports = router;