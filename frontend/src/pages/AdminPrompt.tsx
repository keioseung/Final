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

const initialPrompt = [
  { id: 1, prompt: '문제 생성 프롬프트', base: '기반 내용1' },
  { id: 2, prompt: '해설 생성 프롬프트', base: '기반 내용2' },
  { id: 3, prompt: '정답 생성 프롬프트', base: '기반 내용3' },
  { id: 4, prompt: '오답 생성 프롬프트', base: '기반 내용4' },
  { id: 5, prompt: '힌트 생성 프롬프트', base: '기반 내용5' },
  { id: 6, prompt: '유형 생성 프롬프트', base: '기반 내용6' },
];

const AdminPrompt: React.FC = () => {
  const [data, setData] = useState(initialPrompt);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ prompt: '', base: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const filtered = data.filter(
    d => d.prompt.includes(filter) || d.base.includes(filter)
  );
  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleOpen = (idx: number | null = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm({ prompt: data[idx].prompt, base: data[idx].base });
    } else {
      setForm({ prompt: '', base: '' });
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
        <h2>프롬프트/기반내용 관리</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Input
            placeholder="프롬프트/기반내용 검색"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ maxWidth: 220 }}
          />
          <Button onClick={() => handleOpen(null)}>프롬프트 추가</Button>
        </div>
        <TableContainer component={Paper} style={{ marginTop: 8 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>프롬프트</TableCell>
                <TableCell>기반내용</TableCell>
                <TableCell align="center">관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paged.map((row, i) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.prompt}</TableCell>
                  <TableCell>{row.base}</TableCell>
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
        <DialogTitle>{editIdx === null ? '프롬프트 추가' : '프롬프트 수정'}</DialogTitle>
        <DialogContent>
          <Input
            placeholder="프롬프트"
            value={form.prompt}
            onChange={e => setForm(f => ({ ...f, prompt: e.target.value }))}
          />
          <Input
            placeholder="기반내용"
            value={form.base}
            onChange={e => setForm(f => ({ ...f, base: e.target.value }))}
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

export default AdminPrompt; 