import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const router: Router = Router()
const prisma = new PrismaClient()
//post a product
router.post('/', async (req: Request, res: Response) => {
    const { userId, name, image, product_description, price, location } = req.body
    const result = await prisma.product.create({
        data: {
            userId, // TODO - To Be managed by an Authorized user
            name,
            image,
            product_description,
            price,
            location,
        }
    })
    res.status(201).json(result)
})

//get all products
router.get('/', async (req: Request, res: Response) => {
    const allProducts = await prisma.product.findMany({
        include: { User: true }
        //     select: {
        //       id: true,
        //     product_description: true,
        //   User: {
        //     select: {
        //       id: true,
        //     name: true,
        //   username: true,
        // image: true,
        //}
        //}
        //}
        //cannot use include and select
    });
    res.status(200).json(allProducts)
})
//get a single product
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!product) {
        res.status(404).json({ error: "Product not available" })
    }
    res.status(201).json(product)
})

//update a product
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, image, product_description, price, location } = req.body
    try {
        const result = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                image,
                product_description,
                price,
                location,
            }
        })
        res.json(result)
    } catch (e) {
        res.status(400).json({ error: 'Product not Found' })
    }
})

//delete a product
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    await prisma.product.delete({
        where: {
            id: Number(id)
        }
    })
    res.status(200)
})

export default router;


