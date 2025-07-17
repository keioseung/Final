import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Input from '../components/Input';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialData = [
  { id: 1, name: 'AI 데이터 1', desc: '설명1' },
  { id: 2, name: 'AI 데이터 2', desc: '설명2' },
  { id: 3, name: 'AI 데이터 3', desc: '설명3' },
  { id: 4, name: 'AI 데이터 4', desc: '설명4' },
  { id: 5, name: 'AI 데이터 5', desc: '설명5' },
  { id: 6, name: 'AI 데이터 6', desc: '설명6' },
];

const AdminData: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', desc: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const filtered = data.filter(
    d => d.name.includes(filter) || d.desc.includes(filter)
  );
  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleOpen = (idx: number | null = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm({ name: data[idx].name, desc: data[idx].desc });
    } else {
      setForm({ name: '', desc: '' });
    }
    setOpen(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (editIdx === null) {
        setData([...data, { id: data.length + 1, ...form }]);
        setAlert('추가 완료!');
      } else {
        setData(data.map((d, i) => (i === editIdx ? { ...d, ...form } : d)));
        setAlert('수정 완료!');
      }
      setOpen(false);
    }, 800);
  };

  const handleDelete = (idx: number) => {
    setDeleteIdx(idx);
  };

  const confirmDelete = () => {
    if (deleteIdx !== null) {
      setData(data.filter((_, i) => i !== deleteIdx));
      setAlert('삭제 완료!');
      setDeleteIdx(null);
    }
  };

  return (
    <Layout>
      <Card>
        <h2>데이터 관리</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Input
            placeholder="이름/설명 검색"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ maxWidth: 220 }}
          />
          <Button onClick={() => handleOpen(null)}>데이터 추가</Button>
        </div>
        <TableContainer component={Paper} style={{ marginTop: 8 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>설명</TableCell>
                <TableCell align="center">관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paged.map((row, i) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpen(data.indexOf(row))}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(data.indexOf(row))}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </TableContainer>
        {loading && <Loading />}
        {alert && <Alert severity="success">{alert}</Alert>}
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editIdx === null ? '데이터 추가' : '데이터 수정'}</DialogTitle>
        <DialogContent>
          <Input
            placeholder="이름"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
          <Input
            placeholder="설명"
            value={form.desc}
            onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>취소</Button>
          <Button onClick={handleSave}>{editIdx === null ? '추가' : '저장'}</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteIdx !== null} onClose={() => setDeleteIdx(null)}>
        <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteIdx(null)}>취소</Button>
          <Button onClick={confirmDelete}>삭제</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default AdminData; 