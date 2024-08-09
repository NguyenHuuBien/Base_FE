import React, { useEffect, useState } from 'react'
import { fetchUserList } from 'src/service/users'
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Stack,
    Pagination,
    Button,
    Collapse,
} from '@mui/material';
import { IconFilter, IconUserPlus } from '@tabler/icons';
import UserSearch from 'src/components/search/UserSearch';
import { Link } from 'react-router-dom';
import AddNewModal from './components/AddNewModal';
import NameSearchBar from 'src/components/shared/NameSearchBar';
import Loading from 'src/components/shared/Loading';
import Nothing from 'src/components/shared/Nothing';

const HeaderTitle = ({ setOpen, handleToggleSearchBar }) => {
    const handleOpen = () => setOpen(true);
    return (
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%' }}>
            <Typography variant='h4'>Danh sách người dùng</Typography>
            <Stack
                direction={'row'}
                gap={2}
                alignItems={'center'}
                justifyContent={'end'}
                mb={2}
            >
                <Button variant='outlined' size='small' onClick={handleToggleSearchBar}>
                    <IconFilter />
                </Button>
                <Button variant='contained' size='small' onClick={handleOpen}>
                    <IconUserPlus />
                </Button>
            </Stack>
        </Stack>
    )
}

const UsersPage = () => {

    const [showSearchbar, setShowSearchBar] = useState(false)
    const [listUser, setListUser] = useState([])
    const [open, setOpen] = useState(false);
    const [nameSearch, setNameSearch] = useState('')
    const [page, setPage] = useState(1)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        getListUser()
    }, [page])

    const getListUser = async (params = '') => {
        setLoading(true)
        const res = await fetchUserList(`page=${page}&name=${params}`)
        if (res?.code === 200) {
            setListUser(res?.data)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleToggleSearchBar = () => {
        setShowSearchBar(!showSearchbar)
    }

    const setColorRole = (role) => {
        switch (role) {
            case 'teacher':
                return 'warning.main';
            case 'student':
                return 'success.main';
            case 'admin':
                return 'error.main';

            default:
                return 'primary.main';
        }
    }

    return (
        <PageContainer title="Danh sách người dùng" description="Danh sách người dùng">
            <DashboardCard title={<HeaderTitle setOpen={setOpen} handleToggleSearchBar={handleToggleSearchBar} />}>

                <NameSearchBar
                    value={nameSearch}
                    placeholder='Tìm kiếm người dùng'
                    onChange={(e) => setNameSearch(e.target.value)}
                    onSearch={() => getListUser(nameSearch)}
                    onReset={() => {
                        setNameSearch('')
                        getListUser('')
                    }}
                />
                {
                    isLoading ? <Loading /> :
                        listUser?.data?.length > 0 ?
                            <>
                                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, height: '56vh', mt: 3 }}>
                                    <Table
                                        stickyHeader
                                        aria-label="simple table"
                                        sx={{
                                            whiteSpace: "nowrap",
                                            mt: 2
                                        }}
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        STT
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Id
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Name
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Giới tính
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Email
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Phone
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Role
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listUser?.data?.map((user, index) => (
                                                <TableRow component={Link} to={`/user/${user?._id}`} sx={{ textDecoration: 'none' }} key={user?._id}>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {index + 1}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                fontSize: "15px",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {user?.code}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <Box>
                                                                <Typography variant="subtitle2" fontWeight={600}>
                                                                    {user?.name}
                                                                </Typography>
                                                                <Typography
                                                                    color="textSecondary"
                                                                    sx={{
                                                                        fontSize: "13px",
                                                                    }}
                                                                >
                                                                    {user?.username}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                            {user?.sex}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="h6">{user?.email}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="h6">{user?.phone}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            sx={{
                                                                px: "4px",
                                                                backgroundColor: setColorRole(user?.role?.toLowerCase()),
                                                                color: "#fff",
                                                            }}
                                                            size="small"
                                                            label={user?.role}
                                                        ></Chip>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>

                                <Stack justifyContent={'center'} alignItems={'center'} mt={4}>
                                    <Pagination
                                        count={listUser?.totalPages}
                                        variant="outlined"
                                        shape="rounded"
                                        page={page}
                                        onChange={handleChangePage}
                                    />
                                </Stack>
                            </> :
                            <Nothing title={'Không tìm thấy người dùng.'} />
                }

            </DashboardCard>
            <AddNewModal open={open} setOpen={setOpen} />
        </PageContainer>
    )
}

export default UsersPage