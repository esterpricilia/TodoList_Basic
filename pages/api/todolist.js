import {PrismaClient} from '@prisma/client'


export default async(req, res) => {
    const prisma = new PrismaClient();
    const {method} = req;
    const data = JSON.parse(req.body)
    
    if(method === 'POST'){
        const createdTodoList = await prisma.todo_list.create({
            data
        })

        res.json(createdTodoList)
    }

}