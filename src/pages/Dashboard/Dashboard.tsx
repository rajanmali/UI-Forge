import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './Dashboard.module.scss';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import Avatar from '../../components/Avatar/Avatar';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';
import Tooltip from '../../components/Tooltip/Tooltip';
import Tabs from '../../components/Tabs/Tabs';
import Modal from '../../components/Modal/Modal';
import Switch from '../../components/Switch/Switch';
import Select from '../../components/Select/Select';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import Input from '../../components/Input/Input';
import Textarea from '../../components/Textarea/Textarea';
import { useGetPostsQuery, useGetUsersQuery, useCreatePostMutation } from '../../store/api';
import { useAppDispatch, useAppSelector } from '../../store';
import { addToast } from '../../store/uiSlice';
import {
  setFilterUserId,
  setSortBy,
  setCompactView,
  setPage,
  PAGE_SIZE,
} from '../../store/dashboardSlice';

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const SORT_LABELS: Record<string, string> = { id: 'Date added', title: 'Title A–Z', userId: 'Author' };

const COMPOSE_SEED = {
  title: 'Building Scalable Design Systems with React and TypeScript',
  body: 'Design systems are the backbone of modern front-end engineering. By combining React\'s component model with TypeScript\'s type safety, teams can build consistent, accessible, and maintainable UI libraries that scale across large organisations and product suites.',
  authorId: '3',
};

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/>
    </svg>
  );
}

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      {dir === 'left'
        ? <polyline points="15 18 9 12 15 6" />
        : <polyline points="9 18 15 12 9 6" />}
    </svg>
  );
}

function StatCard({ label, value, delta, deltaVariant, tooltip }: {
  label: string;
  value: string | number;
  delta?: string;
  deltaVariant?: 'success' | 'error';
  tooltip: string;
}) {
  return (
    <motion.div variants={fadeUp}>
      <Card variant="elevated" padding="md" hoverable>
        <div className={styles.stat}>
          <span className={styles.stat__label}>{label}</span>
          <span className={styles.stat__value}>{value}</span>
          {delta && (
            <Tooltip content={tooltip} placement="bottom">
              <span>
                <Badge variant={deltaVariant ?? 'success'} size="sm" dot>{delta}</Badge>
              </span>
            </Tooltip>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

function ComposeModal({ open, onClose, users }: {
  open: boolean;
  onClose: () => void;
  users: { id: number; name: string }[];
}) {
  const dispatch = useAppDispatch();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [authorId, setAuthorId] = useState('1');

  const authorOptions = users.map((u) => ({ value: String(u.id), label: u.name }));

  function handleAutofill() {
    setTitle(COMPOSE_SEED.title);
    setBody(COMPOSE_SEED.body);
    setAuthorId(COMPOSE_SEED.authorId);
  }

  function handleClose() {
    setTitle('');
    setBody('');
    setAuthorId('1');
    onClose();
  }

  async function handleSubmit() {
    if (!title.trim() || !body.trim()) {
      dispatch(addToast({ type: 'warning', message: 'Title and body are required.' }));
      return;
    }
    try {
      await createPost({ title: title.trim(), body: body.trim(), userId: Number(authorId) }).unwrap();
      dispatch(addToast({ type: 'success', message: 'Post published — optimistic update applied via RTK Query middleware.' }));
      setTitle('');
      setBody('');
      setAuthorId('1');
      onClose();
    } catch {
      dispatch(addToast({ type: 'error', message: 'Failed to publish post.' }));
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Compose Post"
      size="md"
      footer={
        <div className={styles.modal_footer}>
          <Button variant="ghost" size="sm" onClick={handleAutofill}>Auto-fill</Button>
          <div className={styles.modal_footer__actions}>
            <Button variant="ghost" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit} loading={isLoading}>Publish</Button>
          </div>
        </div>
      }
    >
      <div className={styles.modal_body}>
        <p className={styles.modal_hint}>
          Demonstrates a <strong>createPost</strong> RTK Query mutation with optimistic UI —
          the post appears instantly while the request is in flight, and rolls back on failure.
        </p>
        <Select
          label="Author"
          options={authorOptions}
          value={authorId}
          onChange={setAuthorId}
          fullWidth
        />
        <Input
          label="Title"
          placeholder="Enter post title…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Textarea
          label="Body"
          placeholder="Write your post…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
        />
      </div>
    </Modal>
  );
}

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { filterUserId, sortBy, compactView, page } = useAppSelector((s) => s.dashboard);
  const [composeOpen, setComposeOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: posts, isLoading: postsLoading, isError: postsError, refetch: refetchPosts } = useGetPostsQuery();
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();

  const userOptions = useMemo(() => [
    { value: '', label: 'All authors' },
    ...(users ?? []).map((u) => ({ value: String(u.id), label: u.name })),
  ], [users]);

  const filteredPosts = useMemo(() => {
    let result = posts ?? [];
    if (filterUserId !== null) result = result.filter((p) => p.userId === filterUserId);
    return [...result].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'userId') return a.userId - b.userId;
      return a.id - b.id;
    });
  }, [posts, filterUserId, sortBy]);

  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const pagedPosts = filteredPosts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const uniqueAuthors = useMemo(() => new Set((posts ?? []).map((p) => p.userId)).size, [posts]);

  async function handleRefresh() {
    setIsRefreshing(true);
    dispatch(addToast({ type: 'info', message: 'Re-fetching posts from JSONPlaceholder…' }));
    try {
      const result = await refetchPosts();
      const count = (result as { data?: typeof posts }).data?.length ?? 0;
      dispatch(addToast({
        type: 'success',
        message: `Refreshed — ${count} posts reloaded. Any optimistic writes were cleared (JSONPlaceholder doesn't persist them).`,
      }));
    } catch {
      dispatch(addToast({ type: 'error', message: 'Refresh failed.' }));
    } finally {
      setIsRefreshing(false);
    }
  }

  const postsTab = (
    <div className={styles.tab_content}>
      {/* Controls bar */}
      <div className={styles.controls}>
        <Select
          options={userOptions}
          value={filterUserId === null ? '' : String(filterUserId)}
          onChange={(v) => dispatch(setFilterUserId(v === '' ? null : Number(v)))}
          placeholder="All authors"
          size="sm"
        />
        <DropdownMenu
          placement="bottom-end"
          trigger={
            <Button variant="secondary" size="sm" leftIcon={<SortIcon />}>
              Sort: {SORT_LABELS[sortBy]}
            </Button>
          }
          sections={[{
            label: 'Sort by',
            items: [
              { id: 'id',     label: 'Date added', onClick: () => dispatch(setSortBy('id')),     icon: sortBy === 'id'     ? <span>✓</span> : undefined },
              { id: 'title',  label: 'Title A–Z',  onClick: () => dispatch(setSortBy('title')),  icon: sortBy === 'title'  ? <span>✓</span> : undefined },
              { id: 'userId', label: 'Author',      onClick: () => dispatch(setSortBy('userId')), icon: sortBy === 'userId' ? <span>✓</span> : undefined },
            ],
          }]}
        />
        <Switch
          label="Compact"
          size="sm"
          checked={compactView}
          onChange={(e) => dispatch(setCompactView(e.target.checked))}
        />
      </div>

      {postsLoading && <div className={styles.center}><Spinner size="lg" color="primary" label="Loading posts" /></div>}
      {postsError && <div className={styles.center}><p className={styles.error}>Failed to load posts.</p></div>}
      {!postsLoading && !postsError && (
        <ul className={styles.list}>
          {pagedPosts.map((post) => (
            <li key={post.id} className={[styles.post_item, compactView ? styles['post_item--compact'] : ''].join(' ')}>
              <Tooltip content={`User #${post.userId}`} placement="right">
                <span className={styles.post_id}>#{post.id}</span>
              </Tooltip>
              <div className={styles.post_content}>
                <p className={styles.post_title}>{post.title}</p>
                {!compactView && <p className={styles.post_body}>{post.body.slice(0, 90)}…</p>}
              </div>
              <Badge variant="neutral" size="sm">U{post.userId}</Badge>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.pagination__info}>
            {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filteredPosts.length)} of {filteredPosts.length}
          </span>
          <div className={styles.pagination__controls}>
            <Button
              variant="ghost" size="sm"
              leftIcon={<ChevronIcon dir="left" />}
              disabled={page === 0}
              onClick={() => dispatch(setPage(page - 1))}
            >Prev</Button>
            <span className={styles.pagination__page}>{page + 1} / {totalPages}</span>
            <Button
              variant="ghost" size="sm"
              rightIcon={<ChevronIcon dir="right" />}
              disabled={page >= totalPages - 1}
              onClick={() => dispatch(setPage(page + 1))}
            >Next</Button>
          </div>
        </div>
      )}
    </div>
  );

  const usersTab = (
    <div className={styles.tab_content}>
      {usersLoading && <div className={styles.center}><Spinner size="lg" color="primary" label="Loading users" /></div>}
      {users && (
        <ul className={styles.list}>
          {users.map((user) => (
            <li key={user.id} className={styles.user_item}>
              <Avatar name={user.name} size="sm" status="online" />
              <div className={styles.user_info}>
                <p className={styles.user_name}>{user.name}</p>
                <p className={styles.user_email}>{user.email}</p>
              </div>
              <div className={styles.user_meta}>
                <Tooltip content={`${(posts ?? []).filter((p) => p.userId === user.id).length} posts authored`} placement="left">
                  <Badge variant="info" size="sm">
                    {(posts ?? []).filter((p) => p.userId === user.id).length} posts
                  </Badge>
                </Tooltip>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <main className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.sub}>
            RTK Query · 100-post dataset · optimistic mutations · client-side Redux filter + sort
          </p>
        </div>
        <div className={styles.header_actions}>
          <Button size="sm" variant="secondary" onClick={handleRefresh} loading={isRefreshing} leftIcon={<RefreshIcon />}>
            Refresh
          </Button>
          <Button size="sm" variant="primary" leftIcon={<PlusIcon />} onClick={() => setComposeOpen(true)}>
            New Post
          </Button>
        </div>
      </div>

      {/* Stats */}
      <motion.div className={styles.stats} variants={stagger} initial="hidden" animate="show">
        <StatCard label="Total Posts" value={posts?.length ?? '—'} delta="+100%" deltaVariant="success"
          tooltip="Full JSONPlaceholder dataset — 100 posts across 10 users" />
        <StatCard label="Active Users" value={users?.length ?? '—'} delta={`${uniqueAuthors} authors`} deltaVariant="success"
          tooltip="Unique authors derived from the posts dataset via useMemo" />
        <StatCard label="Avg. Response" value="142ms" delta="-8ms" deltaVariant="success"
          tooltip="Simulated API latency — RTK Query caches after first fetch" />
        <StatCard label="Error Rate" value="0.3%" delta="+0.1%" deltaVariant="error"
          tooltip="JSONPlaceholder always succeeds — this is illustrative only" />
      </motion.div>

      {/* Main content */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" className={styles.panel}>
        <div className={styles.panel__head}>
          <h2 className={styles.panel__title}>Data Explorer</h2>
          <Badge variant="neutral">{filteredPosts.length} records</Badge>
        </div>
        <Tabs
          variant="line"
          tabs={[
            { id: 'posts', label: 'Posts', content: postsTab },
            { id: 'users', label: 'Users', content: usersTab },
          ]}
        />
      </motion.div>

      <ComposeModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        users={users ?? []}
      />
    </main>
  );
}
