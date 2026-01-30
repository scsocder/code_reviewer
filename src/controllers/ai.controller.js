const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    try {
        // POST → req.body.code
        // GET  → req.query.code
        const code = req.body?.code || req.query?.code;

        if (!code) {
            return res.status(400).json({
                error: "Code is required. Use POST body or ?code= query."
            });
        }

        const response = await aiService(code);
        res.json({ response });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI review failed" });
    }
};
