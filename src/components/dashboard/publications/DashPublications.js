import React from 'react';
import dashPublication from './DashPublications.module.css';
import { fetchDeletePublicationData, fetchPostPublicationData, fetchUpdatePublicationData } from '../../../fetchedData/fetchPublicationData';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import usePublicationHook from '../../../customHooks/usePublicationHook';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';

const DashPublications = ({ darkmode }) => {
    const [user] = useAuthState(auth);
    const [publicationData, refetch] = usePublicationHook()
    const [open, setOpen] = useState(false);
    const allBlogs = publicationData?.data?.data?.data;
    const [viewOption, setViewOption] = useState(1);
    const [findId, setFindId] = useState('');

    const [title, setTitle] = useState('');
    const [publisherName, setPublisherName] = useState('');
    const [link, setLink] = useState('');
    const [allPublicationInfo] = useState({});
    const [updateAllPublicationInfo] = useState({});

    const [updateTitle, setUpdateTitle] = useState('');
    const [updatePublisherName, setUpdatePublisherName] = useState('');
    const [updateLink, setUpdateLink] = useState('');

    const [blankIdentifier, setBlankIdentifier] = useState({});



    const handleModal = (value, id) => {
        setOpen(true);
        setFindId(id);
        if (value === 1) {
            setViewOption(1)
        } else if (value === 2) {
            setViewOption(2)
        } else if (value === 3) {
            setViewOption(3);
        }

    }

    const handleOption = (value) => {
        setOpen(true);
        if (value === 1) {
            setViewOption(1)
        } else if (value === 2) {
            setViewOption(2)
        } else if (value === 3) {
            setViewOption(3);
        }
    }

    const findBlog = allBlogs?.find(f => {
        return f._id === findId;
    });

    const findPendings = allBlogs?.filter(f => {
        return f.approval === false;
    });

    const filteredByUserEmail = allBlogs?.filter(f => {
        return f?.email === user?.email
    })

    useEffect(() => {
        setUpdateTitle(findBlog?.title);
        setUpdatePublisherName(findBlog?.name);
        setUpdateLink(findBlog?.link)
    }, [findBlog])


    const postBlog = async () => {

        allPublicationInfo.title = title
        allPublicationInfo.name = publisherName
        allPublicationInfo.email = user?.email
        allPublicationInfo.link = link

        setBlankIdentifier({
            title: title,
            name: publisherName,
            link: link

        })



        if (
            allPublicationInfo.title !== '' && allPublicationInfo.name !== '' && allPublicationInfo.link !== ''
        ) {
            await fetchPostPublicationData(allPublicationInfo, refetch);
            toast.success('Publication added successfully');

            setTitle('');
            setPublisherName('');
            setLink('');

        } else {
            toast.error('fillup all fields');
        }
    }

    const handleUpdate = async () => {
        updateAllPublicationInfo.title = updateTitle;
        updateAllPublicationInfo.name = updatePublisherName;
        updateAllPublicationInfo.link = updateLink

        await fetchUpdatePublicationData(findId, updateAllPublicationInfo, refetch);
        toast.dark('updated successfully');

    }

    const deletePost = async (theId) => {
        if (theId) {
            const result = window.confirm('are you sure to delete this item?');
            if (result) {
                await fetchDeletePublicationData(theId, refetch);
                toast.dark('successfully deleted');
                refetch();
            }
        }


    }
    return (
        <div className={dashPublication.main}>
            <div className={dashPublication.container}>
                <div className={`${dashPublication.titleContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <br />
                    <div className={dashPublication.titleMain}>
                        <p className={dashPublication.title}> ALL PB :</p>
                        <div className='flex items-center justify-between lg:w-1/6 md:w-2/6 sm:w-3/6'>
                            <p style={{ fontSize: '12.5px' }} className={`${darkmode ? 'text-white' : 'text-gray-500 '} font-semibold`}>TOTAL PENDING: {findPendings?.length} </p>
                            <p onClick={() => handleOption(3)} ><i class="uil uil-plus-circle mr-3 text-3xl text-purple-600 cursor-pointer"></i></p>
                        </div>
                    </div>
                    <br />
                    <hr />
                </div>
                <br />
                {
                    filteredByUserEmail?.slice()?.reverse()?.map((publication, index) => {
                        return (
                            <div key={publication?._id} className={`${open ? 'none' : 'block'}`}>
                                {
                                    <div key={publication?._id} className={dashPublication.detailPart}>
                                        <div className={dashPublication.detailPartContainer}>
                                            <div className={`${darkmode && 'text-white'}`}>
                                                <div className={dashPublication.partOneDetail}>
                                                    <p className='mr-2'>{index + 1} </p>
                                                    <p title={publication?.title} className={dashPublication.partOneDetailTitle}>{publication?.title?.length > 37 ? publication?.title?.slice(0, 37) + '...' : publication?.title}</p>
                                                    <p title={publication?.title} className={dashPublication.partOneDetailTitleRes}>{publication?.title.length > 12 ? publication?.title.slice(0, 12) + '...' : publication?.title}</p>
                                                </div>
                                            </div>
                                            <div className={dashPublication.partTwo}>
                                                <div className={dashPublication.icons}>
                                                    <p>{publication?.approval === true ? <p className='text-sm text-green-600 italic'>approved</p> : <p className='text-sm text-red-600 italic'>pending</p>}</p>
                                                    <p title='view' onClick={() => handleModal(1, publication?._id)} ><i class="uil uil-eye text-blue-600 cursor-pointer"></i></p>
                                                    <p title='edit' onClick={() => handleModal(2, publication?._id)}><i class="uil uil-edit text-green-600 cursor-pointer"></i></p>
                                                    <p title='delete' onClick={() => deletePost(publication?._id)}><i class="uil uil-trash-alt text-red-600 cursor-pointer"></i></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <div className={`${open ? 'block' : 'none'}  ${dashPublication.modal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <i onClick={() => setOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>

                    <br />
                    <div className={dashPublication.modalDetail}>
                        <div className={dashPublication.modalOption}>
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='view' onClick={() => handleOption(1)} className={`${dashPublication.modalView} ${viewOption === 1 && 'bg-blue-600 text-white'} border border-blue-600 rounded `}>
                                    <p ><i class="uil uil-eye"></i></p>
                                </div>
                            }
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='update' onClick={() => handleOption(2)} className={`${dashPublication.modalUpdate} ${viewOption === 2 && 'bg-green-600 text-white'} border border-green-600 rounded`}>
                                    <p><i class="uil uil-edit "></i></p>
                                </div>
                            }
                            {
                                viewOption === 3 &&
                                <div title='add' onClick={() => handleOption(3)} className={`${dashPublication.modalAdd} ${viewOption === 3 && 'bg-purple-600 text-white'} border border-purple-600 rounded`}>
                                    <p className='flex items-center justify-between w-5/6'><i class="uil uil-plus-circle text-2xl"></i> ADD PUBLICATION</p>
                                </div>
                            }
                        </div>
                        <hr />
                        {
                            viewOption === 1 &&
                            <div className={`${dashPublication.viewPart}`}>
                                <div className={dashPublication.viewPartMain}>
                                    <div className={dashPublication.blogsContainer}>
                                        <br />
                                        <p className='text-sm text-gray-500 italic'> <i class="uil uil-user-square"></i> {findBlog?.name}</p>
                                        <br />
                                        <hr />

                                        <br />
                                        <p className='text-xl font-bold'>{findBlog?.title}</p>
                                        <br />
                                        <p className='text-sm font-bold text-green-500'>{findBlog?.link}</p>
                                        <br />
                                        <br />

                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            viewOption === 2 &&
                            <div className={`${dashPublication.updatePart}`}>
                                <div className={`${dashPublication.eventUpdateModalSection}`}>
                                    <br />
                                    <div className={dashPublication.eventInputTitle}>
                                        <label htmlFor="">Blog Title</label>
                                        <input type="text"
                                            value={updateTitle}
                                            onChange={(e) => setUpdateTitle(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={dashPublication.eventInputDateAndDeadline}>
                                        <div>
                                            <label htmlFor="">Publisher Name</label>
                                            <input type="text"
                                                value={updatePublisherName}
                                                onChange={(e) => setUpdatePublisherName(e.target.value)}
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <label htmlFor="">Link</label>
                                            <input type="text"
                                                value={updateLink}
                                                onChange={(e) => setUpdateLink(e.target.value)}
                                            />
                                        </div>

                                    </div>
                                    <br />
                                    <div className={dashPublication.updateEventButton}>

                                        <div >
                                            <button onClick={handleUpdate} className='btn btn-primary mr-10'><i class="uil uil-edit mr-1"></i>update Publication</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            viewOption === 3 &&
                            <div className={`${dashPublication.addPart}`}>
                                <div className={`${dashPublication.addNewModalSection}`}>
                                    <br />
                                    <div className={dashPublication.eventInputTitle}>
                                        <label htmlFor="">Publication Title</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}

                                        />
                                        {
                                            blankIdentifier.title === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                        }
                                    </div>
                                    <br />
                                    <div className={dashPublication.eventInputDateAndDeadline}>
                                        <div>
                                            <label htmlFor="">Publisher Name</label>
                                            <input
                                                type="text"
                                                value={publisherName}
                                                onChange={(e) => setPublisherName(e.target.value)}

                                            />
                                            {
                                                blankIdentifier.name === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                            }
                                        </div>
                                        <br />
                                        <div>
                                            <label htmlFor="">Link </label>
                                            <input
                                                type="text"
                                                value={link}
                                                onChange={(e) => setLink(e.target.value)}

                                            />
                                            {
                                                blankIdentifier.link === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                            }
                                        </div>

                                    </div>
                                    <br />
                                    <br />
                                    <div className={dashPublication.updateEventButton}>
                                        <button onClick={postBlog} className='btn btn-primary mr-10'><i class="uil uil-plus-circle mr-2"></i>Add Publication</button>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>

        </div>
    );
};

export default DashPublications;