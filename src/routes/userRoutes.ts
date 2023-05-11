import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router()
const prisma = new PrismaClient()

//post a user
router.post('/', async (req: Request, res: Response) => {
    const { email, name, username, bio } = req.body;
    const result = await prisma.user.create({
        data: {
            email,
            name,
            username,
            bio,
        }
    })
    res.status(201).json(result)
})

//get all users
router.get('/', async (req: Request, res: Response) => {
    const allUsers = await prisma.user.findMany({
        include: { products: true }
    });
    res.status(200).json(allUsers);
})

//get a single user
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
        where: { id: Number(id) }
    })
    res.status(200).json(user)
})

//update a user
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { bio, username, image } = req.body;
    try {
        const result = await prisma.user.update({
            where: { id: Number(id) },
            data: {
                bio,
                username,
                image,
            }
        })
        res.json(result);
    } catch (e) {
        res.status(400).json({ error: 'Failed to update the user' })
    }
})

//delete a user
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    await prisma.user.delete({
        where: { id: Number(id) }
    })
    res.status(200)
})

export default router;


