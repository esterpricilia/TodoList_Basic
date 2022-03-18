import {PrismaClient} from '@prisma/client'


export default async(req, res) => {
    const prisma = new PrismaClient();
    
    const todo = await prisma.todo_list.findMany()
    return res.json(todo)

}