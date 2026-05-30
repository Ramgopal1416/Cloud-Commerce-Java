import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import categoriesRouter from "./categories";
import productsRouter from "./products";
import cartRouter from "./cart";
import ordersRouter from "./orders";
import reviewsRouter from "./reviews";
import inventoryRouter from "./inventory";
import notificationsRouter from "./notifications";
import chatbotRouter from "./chatbot";
import adminRouter from "./admin";
import openaiRouter from "./openai";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(categoriesRouter);
router.use(productsRouter);
router.use(cartRouter);
router.use(ordersRouter);
router.use(reviewsRouter);
router.use(inventoryRouter);
router.use(notificationsRouter);
router.use(chatbotRouter);
router.use(adminRouter);
router.use(openaiRouter);

export default router;
