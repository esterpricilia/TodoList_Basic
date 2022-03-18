import {PrismaClient} from '@prisma/client'


export default async (req, res) => {
    const prisma = new PrismaClient();
    const {method} = req
    const {id} = req.query
    

    
    if(method === 'DELETE'){
        const deleteTodo = await prisma.todo_list.delete({
            where:{
                id: parseInt(id),  
            } });
        res.json(deleteTodo)
    }

    //update edit activity
    if(method === 'POST'){
        const updateData = JSON.parse(req.body)
            const editTodo = await prisma.todo_list.update({
                where:{
                    id: parseInt(id),
                }, 
                data:{
                    activity: updateData
                }})
        res.json(editTodo)
    }


    if(method === 'PUT'){
        const findTodo = await prisma.todo_list.findFirst({
            where:{
                id: parseInt(id),
            }
        })
        const updateTodo = await prisma.todo_list.update({
            where:{
                id: parseInt(id),
            }, 
            data:{
                status: !findTodo.status
            }});
         res.json(updateTodo)
    }



    if(method === 'GET'){
        const selectTodo = await prisma.todo_list.findUnique({
            where:{
                id: parseInt(id),
            }});

            res.json({temp: selectTodo})
    }


}