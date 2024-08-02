import React from 'react'
import Story from '../Story/Story.js'
import './StoryList.css'

const StoryList = () => {
    const stories = [
        {
            name: "kobee_18",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGCAaQ5u1TMTij5ELPWi5-VPtlSqELw-R6lj0EpYmNcGt56kOQaCokzS0IK81MOSphlkw&usqp=CAU"
        },
        {
            name: "mariussss",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
        },
        {
            name: "redian_",
            image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        {
            name: "johndoe",
            image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
        }
    ]
    return (
        <>
            <div className="story-container">
                {stories.map((story) => (
                    <Story
                        key={story.name}
                        name={story.name}
                        image={story.image}
                    />
                ))}
            </div>
        </>
    )
}

export default StoryList