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

const initialQuiz = [
  { id: 1, question: 'AI란?', answer: '인공지능' },
  { id: 2, question: 'ML이란?', answer: '머신러닝' },
  { id: 3, question: 'DL이란?', answer: '딥러닝' },
  { id: 4, question: 'NLP란?', answer: '자연어처리' },
  { id: 5, question: 'CV란?', answer: '컴퓨터비전' },
  { id: 6, question: 'RL이란?', answer: '강화학습' },
];

const AdminQuiz: React.FC = () => {
  const [data, setData] = useState(initialQuiz);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ question: '', answer: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const filtered = data.filter(
    d => d.question.includes(filter) || d.answer.includes(filter)
  );
  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleOpen = (idx: number | null = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm({ question: data[idx].question, answer: data[idx].answer });
    } else {
      setForm({ question: '', answer: '' });
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
        <h2>퀴즈 관리</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Input
            placeholder="질문/정답 검색"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ maxWidth: 220 }}
          />
          <Button onClick={() => handleOpen(null)}>퀴즈 추가</Button>
        </div>
        <TableContainer component={Paper} style={{ marginTop: 8 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>질문</TableCell>
                <TableCell>정답</TableCell>
                <TableCell align="center">관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paged.map((row, i) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.question}</TableCell>
                  <TableCell>{row.answer}</TableCell>
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
        <DialogTitle>{editIdx === null ? '퀴즈 추가' : '퀴즈 수정'}</DialogTitle>
        <DialogContent>
          <Input
            placeholder="질문"
            value={form.question}
            onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
          />
          <Input
            placeholder="정답"
            value={form.answer}
            onChange={e => setForm(f => ({ ...f, answer: e.target.value }))}
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

export default AdminQuiz; 