import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const CommentDialog = ({ open, setOpen, post }) => {

  const [text, setText] = useState('');
  const onChangeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) setText(inputText)
    else setText('')
  }

  const sendMessageHandler = () => {
    alert(text)
  }
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className='max-w-5xl p-0 flex flex-col'>
        <div className='flex flex-1 p-0'>
          <div className='w-1/2 p-0'>
            <img src={post?.image}
              alt='post_image' className='w-full h-full object-cover rounded-l-lg' />
          </div>
          <div className='w-1/2 flex flex-col justify-between'>
            <div className='flex items-center justify-between p-4'>
              <div className='flex items-center gap-3'>
                <Link>
                  <Avatar>
                    <AvatarImage src={post.author?.profilePicture} alt="post_image" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className='font-semibold text-xs mr-4'>{post.author.username}</Link>
                  {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className='cursor-pointer' />
                </DialogTrigger>
                <DialogContent className='flex flex-col items-center text-sm text-center'>
                  <div className='cursor-pointer w-full text-[#ED4956] font-bold'>Unfollow</div>
                  <div className='cursor-pointer w-full'>Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className='p-4 flex-1 overflow-y-auto mah-h-96'>
              comments
            </div>
            <div className='p-4'>
              <div className='flex items-center justify-between gap-2'>
                <input type="text" value={text} onChange={onChangeEventHandler} placeholder='Add a comment' className='outline-none text-sm w-full border border-x-gray-300 rounded p-2'/>
                <Button onClick={sendMessageHandler} disabled={!text.trim()} variant='outline' className='text-[#3BADF8]'>Send</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog