import {
  IconPencil,
  IconWriting,
  IconLayoutDashboard,
  IconReportAnalytics,
  IconMoodHappy,
  IconUpload,
  IconArticle,
  IconCertificate,
  IconBooks,
  IconUser,
  IconCircleCheck,
} from '@tabler/icons';

import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';

const MenuItems = () => {
  const [role, setRole] = useState('student')

  useEffect(() => {
    setRole(window.localStorage.getItem('role'))
  }, [])

  if (role === 'student') {
    return [
      {
        navlabel: true,
        subheader: 'Home',
      },
      {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconLayoutDashboard,
        href: '/dashboard',
      },
      {
        navlabel: true,
        subheader: 'Khóa học',
      },
      {
        id: uniqueId(),
        title: 'Đăng ký khóa học',
        icon: IconCertificate,
        href: '/courses',
      },
      {
        id: uniqueId(),
        title: 'Khóa học của tôi',
        icon: IconBooks,
        href: '/my-courses',
      },
      {
        navlabel: true,
        subheader: 'Test',
      },
      {
        id: uniqueId(),
        title: 'Đề thi online',
        icon: IconPencil,
        href: '/tests',
      },
      {
        id: uniqueId(),
        title: 'Thống kê kết quả',
        icon: IconReportAnalytics,
        href: '/report/tests',
      },
      {
        navlabel: true,
        subheader: 'Blog',
      },
      {
        id: uniqueId(),
        title: 'Bài viết',
        icon: IconArticle,
        href: '/blog',
      },
    ];
  } else if (role === 'teacher') {
    return [
      {
        navlabel: true,
        subheader: 'Giảng dạy',
      },
      {
        id: uniqueId(),
        title: 'Khoá học',
        icon: IconCertificate,
        href: '/created-courses',
      },
      {
        id: uniqueId(),
        title: 'Bài thi',
        icon: IconBooks,
        href: '/created-test',
      },
      {
        navlabel: true,
        subheader: 'Thống kê',
      },
      {
        id: uniqueId(),
        title: 'Khoá học',
        icon: IconArticle,
        href: '/report/courses',
      },
      {
        navlabel: true,
        subheader: 'Blog',
      },
      {
        id: uniqueId(),
        title: 'Bài viết',
        icon: IconWriting,
        href: '/blog',
      },
      // {
      //   id: uniqueId(),
      //   title: 'Tạo bài viết',
      //   icon: IconUpload,
      //   href: '/',
      // },
    ];
  } else {
    return [
      {
        navlabel: true,
        subheader: 'Người dùng',
      },
      {
        id: uniqueId(),
        title: 'Users',
        icon: IconUser,
        href: '/users',
      },
      {
        navlabel: true,
        subheader: 'Khoá học',
      },
      {
        id: uniqueId(),
        title: 'Duyệt bài',
        icon: IconCircleCheck,
        href: '/courses-approve',
      },
    ];
  }
}

export default MenuItems;
