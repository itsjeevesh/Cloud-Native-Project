import data from "../utils/data.js";

export const getUserData = (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        let userData = data.find((user) => user.id === userId);

        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }

        if (userData.admin) {
            return res.status(200).json(data);
        }

        return res.status(200).json(userData);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}