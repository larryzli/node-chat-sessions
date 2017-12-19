const notAllowed = [
    "poo",
    "shoot",
    "darn",
    "freak",
    "dagnabit",
    "dang",
    "fuck",
    "shit",
    "bitch",
    "damn",
    "wtf",
    "stfu"
];

module.exports = (req, res, next) => {
    while (
        notAllowed.find(word => req.body.text.toLowerCase().includes(word))
    ) {
        const badWord = notAllowed.find(word =>
            req.body.text.toLowerCase().includes(word)
        );
        req.body.text = req.body.text
            .toLowerCase()
            .replace(badWord, "*".repeat(badWord.length));
    }
    next();
};
