import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../database";
import { ApiError, encryptPassword, isPasswordMatch } from "../utils";
import config from "../config/config";
import { IUser } from "../database";

const jwtSecret = config.JWT_SECRET as string;
const COOKIE_EXPIRATION_DAYS = 90; // cookie expiration in days
const expirationDate = new Date(
    Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
);

let recipesList = [
    { id: 1, title: 'Mexican Chicken Potato Soup', content: 'Preheat oven to 450°F Place peppers on foil-lined baking sheet. Roast for 20 minutes or until blackened, turning occasionally. Wrap peppers up in foil to steam. Let stand 15 minutes. Remove skin and seeds from peppers and chop.' },
    { id: 2, title: 'Grilled Tuna With White Bean and Charred Onion Salad', content: 'Heat oil in Dutch oven over medium heat. Add onions, garlic, ground cumin and cumin seed. Saute 5 minutes. Add chicken broth, reserved peppers, corn, potatoes and chicken. Bring to a boil. Cover, reduce heat and simmer 20 minutes. Serve with baked corn tortilla strips, avocado, and cilantro, if desired.' },
    { id: 3, title: 'Marmitako - Basque Fish Stew', content: 'Start by peeling the potatoes and slicing them roughly. Then peel and thinly slice both the onion and the garlic. Pour the oil into a saucepan and let it warm on the hob until it starts to smoke. Then add the potatoes, the onion and the garlic and let these cook for about 5 minutes, turning occasionaly.' }
  ];
  let recipesListString = JSON.stringify(recipesList);
const cookieOptions = {
    expires: expirationDate,
    secure: false,
    httpOnly: true,
};

const recipes = async (req: Request, res: Response) => {
    try {
        console.log(recipesListString + recipesListString)
    return res.send({
        status: 200,
        message: "Recipes retreived successfully!",
        data: recipesListString,
    });
} catch (error: any) {
    return res.json({
        status: 500,
        message: error.message,
    });
}
};

const recipesByPlan = async (req: Request, res: Response) => {
    try {
        const recipe = recipesList.find(a => a.id === parseInt(req.params.id));
    if (!recipe) return res.json({status:404,message:'Recipe not found'});
    res.header("Access-Control-Allow-Origin", "*");
    return res.json({
        status: 200,
        message: "User registered successfully!",
        data: recipesList,
    });
} catch (error: any) {
    return res.json({
        status: 500,
        message: error.message,
    });
}
};

const createSendToken = async (user: IUser, res: Response) => {
    const { name, email, id } = user;
    const token = jwt.sign({ name, email, id }, jwtSecret, {
        expiresIn: "1d",
    });
    if (config.env === "production") cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);

    return token;
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (
            !user ||
            !(await isPasswordMatch(password, user.password as string))
        ) {
            throw new ApiError(400, "Incorrect email or password");
        }

        const token = await createSendToken(user!, res);

        return res.json({
            status: 200,
            message: "User logged in successfully!",
            token,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

export default {
    recipes,
    recipesByPlan,
};
