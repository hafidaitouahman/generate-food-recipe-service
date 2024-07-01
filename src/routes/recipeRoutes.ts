import { Router } from "express";
import RecipeController from "../controllers/RecipeController";
import { Express, Request, Response} from 'express';

const recipRouter = Router();

recipRouter.get("/recipes/:id", RecipeController.recipesByPlan);
recipRouter.get("/recipes", RecipeController.recipes);

export default recipRouter;