import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const Post = () => {
  return (
    <div className='my-8 w-full max-w-sm mx-auto'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <Avatar>
                    <AvatarImage src="" alt="post_image" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1>username</h1>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <MoreHorizontal className='cursor-pointer' />
                </DialogTrigger>
                <DialogContent className='flex flex-col items-center text-sm text-center'>
                    <Button variant='ghost' className='cursor-pointer w-fit text-[#ED4956]'>Unfollow</Button>
                    <Button variant='ghost' className='cursor-pointer w-fit'>Add to favorites</Button>
                    <Button variant='ghost' className='cursor-pointer w-fit'>Cancel</Button>
                </DialogContent>
            </Dialog>
        </div>
            <img className='rounded-sm my-2 w-full aspect-square object-cover' src='https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='post_image'/>
            <div>
                <div>
                    <div>
                        
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Post