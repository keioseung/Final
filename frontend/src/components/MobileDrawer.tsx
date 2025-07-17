import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import DataObjectIcon from '@mui/icons-material/DataObject';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const menus = [
  { to: '/dashboard', label: '대시보드', icon: <DashboardIcon /> },
  { to: '/quiz', label: '퀴즈풀이', icon: <QuizIcon /> },
  { to: '/admin/data', label: '데이터 관리', icon: <DataObjectIcon /> },
  { to: '/admin/quiz', label: '퀴즈 관리', icon: <AssignmentIcon /> },
  { to: '/admin/prompt', label: '프롬프트 관리', icon: <TextSnippetIcon /> },
  { to: '/profile', label: '마이페이지', icon: <PersonIcon /> },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

const MobileDrawer: React.FC<Props> = ({ open, onClose }) => {
  const navigate = useNavigate();
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 240 }}>
        {menus.map((m) => (
          <ListItem key={m.to} disablePadding>
            <ListItemButton onClick={() => { navigate(m.to); onClose(); }}>
              <ListItemIcon>{m.icon}</ListItemIcon>
              <ListItemText primary={m.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default MobileDrawer; 