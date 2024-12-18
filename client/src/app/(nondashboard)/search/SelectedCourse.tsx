import React from 'react'

const SelectedCourse = ({ course, handleEnrollNow }: SelectedCourseProps) => {
  return (
    <div className='selected-course'>
        <div>
            <h3 className='selected-course__title'>{course.title}</h3>
        </div>
    </div>
  )
}

export default SelectedCourse