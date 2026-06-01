import styles from './Dashboard.module.scss';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import Avatar from '../../components/Avatar/Avatar';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';
import { useGetPostsQuery, useGetUsersQuery } from '../../store/api';
import { useAppDispatch } from '../../store';
import { addToast } from '../../store/uiSlice';

function StatCard({ label, value, delta, variant }: { label: string; value: string | number; delta?: string; variant?: 'success' | 'error' }) {
  return (
    <Card variant="elevated" padding="md">
      <div className={styles.stat}>
        <span className={styles.stat__label}>{label}</span>
        <span className={styles.stat__value}>{value}</span>
        {delta && <Badge variant={variant ?? 'success'} size="sm" dot>{delta}</Badge>}
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { data: posts, isLoading: postsLoading, isError: postsError, refetch: refetchPosts } = useGetPostsQuery();
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();

  return (
    <main className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.sub}>Live data via RTK Query + JSONPlaceholder API</p>
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            refetchPosts();
            dispatch(addToast({ type: 'info', message: 'Refreshing posts…' }));
          }}
          leftIcon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
          }
        >
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <StatCard label="Total Posts" value={posts?.length ?? '—'} delta="+12%" variant="success" />
        <StatCard label="Active Users" value={users?.length ?? '—'} delta="+3%" variant="success" />
        <StatCard label="Avg. Response" value="142ms" delta="-8ms" variant="success" />
        <StatCard label="Error Rate" value="0.3%" delta="+0.1%" variant="error" />
      </div>

      <div className={styles.grid}>
        {/* Posts */}
        <section className={styles.panel}>
          <div className={styles.panel__head}>
            <h2 className={styles.panel__title}>Recent Posts</h2>
            <Badge variant="neutral">{posts?.length ?? 0}</Badge>
          </div>
          {postsLoading && (
            <div className={styles.center}>
              <Spinner size="lg" color="primary" label="Loading posts" />
            </div>
          )}
          {postsError && (
            <div className={styles.center}>
              <p className={styles.error}>Failed to load posts.</p>
            </div>
          )}
          {posts && (
            <ul className={styles.list}>
              {posts.map((post) => (
                <li key={post.id} className={styles.post_item}>
                  <span className={styles.post_id}>#{post.id}</span>
                  <div className={styles.post_content}>
                    <p className={styles.post_title}>{post.title}</p>
                    <p className={styles.post_body}>{post.body.slice(0, 80)}…</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Users */}
        <section className={styles.panel}>
          <div className={styles.panel__head}>
            <h2 className={styles.panel__title}>Users</h2>
            <Badge variant="neutral">{users?.length ?? 0}</Badge>
          </div>
          {usersLoading && (
            <div className={styles.center}>
              <Spinner size="lg" color="primary" label="Loading users" />
            </div>
          )}
          {users && (
            <ul className={styles.list}>
              {users.map((user) => (
                <li key={user.id} className={styles.user_item}>
                  <Avatar name={user.name} size="sm" status="online" />
                  <div>
                    <p className={styles.user_name}>{user.name}</p>
                    <p className={styles.user_email}>{user.email}</p>
                  </div>
                  <Badge variant="success" size="sm" className={styles.user_badge}>Active</Badge>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
