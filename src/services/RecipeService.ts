import amqp, { Channel, Connection } from "amqplib";
import config from "../config/config";
import { User } from "../database";
import { ApiError } from "../utils";

class RecipeService {

    constructor() {
        this.init();
    }

    async init() {
    }

    

}
const getUserDetails = async (userId: string) => {
    const userDetails = await User.findById(userId).select("-password");
    if (!userDetails) {
        throw new ApiError(404, "User not found");
    }

    return userDetails;
};

export const recipeService = new RecipeService();