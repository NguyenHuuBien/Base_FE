import React, { useEffect, useState } from 'react';
import { Stack, Button, Grid, TextField, InputAdornment, Typography, Collapse, Box, Divider, IconButton } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import CourseForm from 'src/components/forms/course-form';
import { useParams } from 'react-router';
import { createLeason, editLeason, fetchLessonList } from 'src/service/lesson';
import Nothing from 'src/components/shared/Nothing';
import toast from 'react-hot-toast';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createDocument, fetchDocumentList, updateDocument } from 'src/service/document';
import Loading from 'src/components/shared/Loading';

const EditCourse = () => {
  const paramURL = useParams()
  console.log('paramURL', paramURL)
  const [listLesson, setListLesson] = useState()
  const [listDocument, setListDocument] = useState()
  const [isOpenCreateLesson, setOpenCreateLesson] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isEditDocument, setIsEditdocument] = useState(false)
  const [isOpenCreateDocument, setOpenCreateDocument] = useState(false)
  const [selectedFile, setSelectedFile] = useState([]);
  const [desc, setDesc] = useState('')
  const [lessonId, setLessonId] = useState('')
  const [documentChange, setDocumentChange] = useState({
    _id: '',
    document: [],
    lesson: '',
  })

  useEffect(() => {
    getListLesson()
    getListDocument()
  }, [isLoading])

  const getListLesson = async () => {
    const res = await fetchLessonList(`course=${paramURL?.id}&status=1`)

    if (res?.code === 200) {
      setListLesson(res?.data)
    }
  }

  const getListDocument = async () => {
    const res = await fetchDocumentList(`course=${paramURL?.id}&status=1`)

    if (res?.code === 200) {
      setListDocument(res?.data)
    }
  }

  const handleCreateLeason = async () => {
    setLoading(true)
    const params = new FormData();
    params.append("file", selectedFile);
    params.append("description", desc);
    params.append("course", paramURL?.id);

    const res = await createLeason(params)
    if (res?.code === 200) {
      toast.success("Thêm bài giảng thành công.")
      setLoading(false)
      setDesc('')
      setLessonId('')
      setIsEdit(false)
      setSelectedFile([])
    } else {
      toast.error(res?.message)
      setLoading(false)
    }
  }

  const handleCreateDocument = async () => {

    const params = new FormData();
    params.append("document", documentChange?.document);
    // params.append("description", documentChange);
    params.append("course", paramURL?.id);

    if (documentChange?.document) {
      setLoading(true)
      const res = await createDocument(params)
      if (res?.code === 200) {
        toast.success("Thêm tài liệu thành công.")
        setLoading(false)
        setDocumentChange({
          _id: '',
          document: [],
          lesson: '',
        })
      } else {
        toast.error(res?.message)
        setLoading(false)
      }
    } else toast.error("Hãy nhập file tài liệu.")
  }

  const handleFileChange = (event) => {
    const file = event?.target?.files[0];
    if (file && (
      file.type === 'application/zip' ||
      file.type === 'application/x-zip-compressed'
    )) {
      setSelectedFile(file);
    } else {
      toast.error('Please upload a zip file');
    }
  };

  const handleDocumentChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      setDocumentChange({
        ...documentChange,
        document: file
      })
    } else {
      toast.error('Hãy chọn file');
    }
  }

  const handleEditLeason = async (id) => {
    setLoading(true)
    const params = new FormData()
    selectedFile?.length > 0 && params.append("file", selectedFile)
    params.append("description", desc)
    const res = await editLeason(id, params)
    if (res?.code === 200) {
      toast.success("Cập nhật bài giảng thành công.")
      setDesc('')
      setLessonId('')
      setIsEdit(false)
      setSelectedFile([])
    } else {
      toast.error(res?.message)
    }
    setLoading(false)
  }

  const handleEditDocument = async (id) => {
    setLoading(true)
    const params = new FormData()
    documentChange?.document && params.append("document", documentChange?.document)
    const res = await updateDocument(id, params)
    if (res?.code === 200) {
      toast.success("Cập nhật tài liệu thành công.")
      setDocumentChange({
        _id: '',
        document: [],
        lesson: '',
      })
      setIsEditdocument(false)
    } else {
      toast.error(res?.message)
    }
    setLoading(false)
  }

  const handleDeleteLeason = async (id) => {
    setLoading(true)
    const res = await editLeason(id, {
      status: 0
    })
    if (res?.code === 200) {
      toast.success("Xoá bài giảng thành công.")
    } else {
      toast.error(res?.message)
    }
    setLoading(false)
  }

  const handleDeleteDocument = async (id) => {
    setLoading(true)
    const res = await updateDocument(id, {
      status: 0
    })
    if (res?.code === 200) {
      toast.success("Xoá tài liệu thành công.")
    } else {
      toast.error(res?.message)
    }
    setLoading(false)
  }

  const handleOpenCreateLesson = () => {
    setOpenCreateLesson(!isOpenCreateLesson)
  }

  const handleOpenCreateDocument = () => {
    setOpenCreateDocument(!isOpenCreateDocument)
  }

  return (
    <PageContainer title="Edit Course" description="this is Edit Course page">

      <CourseForm type='edit' />

      <Box sx={{ mb: 4 }} />

      <Box id='form-lesson'>
        <DashboardCard title={
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant='h4'>Bài giảng ({listLesson?.length})</Typography>
            <IconButton onClick={handleOpenCreateLesson} color="primary" aria-label="add leasson">
              <AddCircleOutlineIcon fontSize='25px' />
            </IconButton>
          </Stack>
        }>
          <Collapse in={isOpenCreateLesson}>
            {/* FORM */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  focused={isEdit}
                  multiline
                  rows={3}
                  id="outlined-basic1"
                  label="Mô tả"
                  variant="outlined"
                  name='description'
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DriveFileRenameOutlineOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack alignItems={'end'} direction={'row'} justifyContent={'space-between'}>
                  <input type="file" accept=".zip" onChange={handleFileChange} />
                  {
                    isEdit ?
                      <Stack gap={1} direction={'row'}>
                        <Button variant="contained" onClick={() => handleEditLeason(lessonId)}>Save</Button>
                        <Button variant="outlined" color='error' onClick={() => {
                          setDesc('')
                          setLessonId('')
                          setIsEdit(false)
                          setSelectedFile([])
                        }}>Cancel</Button>
                      </Stack>
                      :
                      <Button variant="contained" onClick={handleCreateLeason}>Thêm mới</Button>
                  }
                </Stack>
              </Grid>
            </Grid>
          </Collapse>
        </DashboardCard>
      </Box>
      <Box sx={{ mb: 4 }} />

      <Collapse in={isOpenCreateLesson}>
        {
          !isLoading ?
            (listLesson?.length > 0 ?
              listLesson?.map((item, index) => (
                <>
                  <DashboardCard>
                    <Stack direction={'row'} alignItems={'start'} gap={2}>
                      <IconButton onClick={handleOpenCreateDocument} color="primary" aria-label="add leasson">
                        <Typography variant='h5'>{index + 1}</Typography>
                      </IconButton>
                      <Grid container spacing={2} key={item?._id}>
                        <Grid item xs={12}>
                          <Stack alignItems={'end'} direction={'row'} justifyContent={'space-between'}>
                            {/* <input type="file" accept=".zip" onChange={handleFileChange} /> */}
                            <Typography variant='h6'>Bài giảng: {item?.name}</Typography>
                            <Stack alignItems={'center'} direction={'row'} gap={2}>
                              <Button href='#form-lesson' variant="contained" onClick={() => {
                                setDesc(item?.description)
                                setLessonId(item?._id)
                                setIsEdit(true)
                                setSelectedFile([])
                              }}>Cập nhật</Button>
                              <Button variant="outlined" color='error' onClick={() => handleDeleteLeason(item?._id)}>Xoá</Button>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant='h7'>{item?.description}</Typography>
                        </Grid>
                      </Grid>
                    </Stack>
                  </DashboardCard>
                  <Box sx={{ mb: 4 }} />
                </>
              ))
              :
              <>
                <DashboardCard>
                  <Nothing title='Chưa có bài giảng nào được tạo' />
                </DashboardCard>
                <Box sx={{ mb: 4 }} />
              </>
            ) : <Loading />
        }
      </Collapse>

      <Box id='form-document'>
        <DashboardCard title={
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant='h4'>Tài liệu ({listDocument?.length})</Typography>
            <IconButton onClick={handleOpenCreateDocument} color="primary" aria-label="add leasson">
              <AddCircleOutlineIcon fontSize='25px' />
            </IconButton>
          </Stack>
        }>
          <Collapse in={isOpenCreateDocument}>
            {/* FORM */}
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  id="outlined-basic1"
                  label="Mô tả"
                  variant="outlined"
                  name='description'
                  value={desc}
                  onChange={handleDocumentChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DriveFileRenameOutlineOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid> */}
              <Grid item xs={12}>
                <Stack alignItems={'end'} direction={'row'} justifyContent={'space-between'}>
                  <input type="file" accept=".zip" onChange={handleDocumentChange} />
                  {
                    isEditDocument ?
                      <Stack gap={1} direction={'row'}>
                        <Button variant="contained" onClick={() => handleEditDocument(documentChange?._id)}>Save</Button>
                        <Button variant="outlined" color='error' onClick={() => {
                          setDocumentChange({
                            _id: '',
                            document: [],
                            lesson: '',
                          })
                          setIsEditdocument(false)
                        }}>Cancel</Button>
                      </Stack>
                      :
                      <Button variant="contained" onClick={handleCreateDocument}>Thêm mới</Button>
                  }
                </Stack>
              </Grid>
            </Grid>
          </Collapse>
        </DashboardCard>
      </Box>

      <Box sx={{ mb: 4 }} />

      <Collapse in={isOpenCreateDocument}>
        {
          !isLoading ?
            (listDocument?.length > 0 ?
              listDocument?.map((item, index) => (
                <>
                  <DashboardCard>
                    <Stack direction={'row'} alignItems={'start'} gap={2}>
                      <IconButton onClick={handleOpenCreateDocument} color="primary" aria-label="add leasson">
                        <Typography variant='h5'>{index + 1}</Typography>
                      </IconButton>
                      <Grid container spacing={2} key={item?._id}>
                        {/* <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            id="outlined-basic1"
                            label="Mô tả"
                            variant="outlined"
                            name='description'
                            value={item?.description}
                            onChange={(e) => setDesc(e.target.value)}
                          />
                        </Grid> */}
                        <Grid item xs={12}>
                          <Stack gap={2}>
                            {/* <input type="file" accept=".zip" onChange={handleFileChange} /> */}
                            <Typography component='a' variant='a' href={item?.document} target="_blank">{item?.document}</Typography>
                            <Stack alignItems={'center'} justifyContent={'end'} direction={'row'} gap={2}>
                              <Button href='#form-document' variant="contained" onClick={() => {
                                setDocumentChange({
                                  ...setDocumentChange,
                                  _id: item?._id,
                                  lesson: paramURL?.id,
                                  document: [],
                                })
                                setIsEditdocument(true)
                              }}>Cập nhật</Button>
                              <Button variant="outlined" color='error' onClick={() => handleDeleteDocument(item?._id)}>Xoá</Button>
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Stack>
                  </DashboardCard>
                  <Box sx={{ mb: 4 }} />
                </>
              ))
              :
              <>
                <DashboardCard>
                  <Nothing title='Chưa có tài liệu nào được tạo' />
                </DashboardCard>
                <Box sx={{ mb: 4 }} />
              </>
            ) : <Loading />
        }
      </Collapse>

    </PageContainer >
  )
}

export default EditCourse