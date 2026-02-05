import Link from 'next/link';
import { getMasterRoadmap, getCompanyInfo, getAllTasks, getDailyReports } from '@/lib/markdown';
import { Search, Bell, User, Star, Activity, LayoutGrid, Target, Plus, ArrowRight, ExternalLink, Folder, TrendingUp, Building2, CheckCircle, Circle, Clock, FileText, Lightbulb } from 'lucide-react';
import { AddTaskForm } from './AddTaskForm';

export default function Dashboard() {
  const { projects, sasakiAdvice } = getMasterRoadmap();
  const companyInfo = getCompanyInfo();
  const allTasks = getAllTasks();
  const dailyReports = getDailyReports();
  const todayReport = dailyReports[0];
  const projectNames = ['amber-house', 'lovable'];

  return (
    <div style={{ minHeight: '100vh', background: '#fcfcfc' }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: '280px', height: '100vh', position: 'fixed', left: 0, top: 0, borderRight: '1px solid #eee', background: '#fff', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '40px', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px' }}>
          <div style={{ width: '32px', height: '32px', background: '#1f3326', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: '900', fontSize: '18px' }}>A</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', color: '#1f3326', letterSpacing: '-0.5px' }}>Amber Admin</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'Overview', icon: <LayoutGrid size={18} />, href: '/', active: true },
            { label: 'Files', icon: <Folder size={18} />, href: '/explorer', active: false },
            { label: 'Milestones', icon: <Star size={18} />, href: '#', active: false },
            { label: 'Activity', icon: <Activity size={18} />, href: '#', active: false },
          ].map((item, i) => (
            <Link key={i} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
              textDecoration: 'none',
              background: item.active ? 'rgba(31, 51, 38, 0.05)' : 'transparent',
              color: item.active ? '#1f3326' : '#666',
              fontWeight: item.active ? '600' : '400'
            }}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '280px', padding: '60px 80px' }}>

        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f3326', margin: '0 0 8px' }}>Master Roadmap</h1>
            <p style={{ color: '#666', fontSize: '15px' }}>株式会社Amber 統合進捗管理ハブ</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#999' }} />
              <input
                type="text"
                placeholder="Search..."
                style={{ padding: '8px 12px 8px 36px', border: '1px solid #eee', borderRadius: '6px', width: '240px', fontSize: '14px', background: '#fff' }}
              />
            </div>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
              <Plus size={18} /> New Report
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '48px' }}>

          {/* Projects Column */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Priority Legend */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f3326' }}>Active Units</h2>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#1f3326' }}></span> P1 最優先</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(31,51,38,0.5)' }}></span> P2 高</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#ccc' }}></span> P3-4</span>
              </div>
            </div>

            {/* Sorted Project Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {[...projects].sort((a, b) => {
                const pA = parseInt(a.priority.match(/\d/)?.[0] || '9');
                const pB = parseInt(b.priority.match(/\d/)?.[0] || '9');
                return pA - pB;
              }).map((project, i) => {
                const priorityNum = parseInt(project.priority.match(/\d/)?.[0] || '9');
                const isP1 = priorityNum === 1;

                return (
                  <div key={i} className="amber-card" style={{
                    padding: '24px',
                    border: isP1 ? '2px solid #1f3326' : '1px solid #eee',
                    boxShadow: isP1 ? '0 4px 20px rgba(31,51,38,0.15)' : undefined,
                    position: 'relative'
                  }}>
                    {isP1 && (
                      <div style={{ position: 'absolute', top: '-10px', left: '20px', background: '#1f3326', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>
                        🔥 Top Priority
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', marginTop: isP1 ? '10px' : 0 }}>
                      <div>
                        <span style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', fontWeight: '600' }}>{project.division}</span>
                        <h3 style={{ margin: '4px 0 0', fontSize: '18px', fontWeight: '700', color: '#1f3326' }}>{project.name}</h3>
                      </div>
                      <span className={`badge priority-${priorityNum}`}>
                        P{priorityNum}
                      </span>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                        <span style={{ color: '#666' }}>Progress</span>
                        <span style={{ color: '#1f3326', fontWeight: '600' }}>{project.status.includes('完了') ? '100%' : '65%'}</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-bar" style={{ width: project.status.includes('完了') ? '100%' : '65%' }} />
                      </div>
                    </div>

                    <div style={{ color: '#666', fontSize: '13px', lineHeight: '1.6' }}>
                      <p style={{ margin: 0 }}><strong>Status:</strong> {project.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TODO List Section */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f3326', margin: 0 }}>📋 TODO リスト（優先順位順）</h2>
                <span style={{ fontSize: '12px', color: '#999' }}>{allTasks.length} タスク</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {allTasks.slice(0, 10).map((task, i) => {
                  const isP1 = task.priority === 'P1';
                  const isInProgress = task.status === '進行中';

                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px',
                      background: isP1 ? 'rgba(31,51,38,0.05)' : '#fff',
                      border: isP1 ? '2px solid #1f3326' : '1px solid #eee',
                      borderRadius: '10px'
                    }}>
                      {isInProgress ? (
                        <Clock size={18} color="#1f3326" />
                      ) : (
                        <Circle size={18} color="#ccc" />
                      )}

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f3326' }}>{task.task}</span>
                          <span style={{
                            padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '700',
                            background: isP1 ? '#1f3326' : task.priority === 'P2' ? 'rgba(31,51,38,0.2)' : '#eee',
                            color: isP1 ? '#fff' : '#333'
                          }}>
                            {task.priority}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#888', display: 'flex', gap: '16px' }}>
                          <span>📁 {task.project}</span>
                          <span>👤 {task.assignee}</span>
                          <span>📅 {task.dueDate}</span>
                        </div>
                      </div>

                      <span style={{
                        padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600',
                        background: isInProgress ? 'rgba(31,51,38,0.1)' : '#f5f5f5',
                        color: isInProgress ? '#1f3326' : '#999'
                      }}>
                        {task.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Task Form */}
            <div style={{ marginTop: '20px' }}>
              <AddTaskForm projects={projectNames} />
            </div>
          </section>

          {/* Sidebar Area */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Today's Report */}
            {todayReport && (
              <div style={{ padding: '24px', background: 'linear-gradient(135deg, #1f3326 0%, #2d4a38 100%)', borderRadius: '12px', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={18} />
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', textTransform: 'uppercase' }}>Today&apos;s Report</h3>
                  </div>
                  <span style={{ fontSize: '11px', opacity: 0.7 }}>{todayReport.date}</span>
                </div>

                {/* したこと */}
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '11px', textTransform: 'uppercase', opacity: 0.7 }}>✅ したこと</h4>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', lineHeight: '1.6' }}>
                    {todayReport.done.slice(0, 3).map((item, i) => (
                      <li key={i} style={{ opacity: 0.9 }}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* TODO */}
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '11px', textTransform: 'uppercase', opacity: 0.7 }}>📋 TODO</h4>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', lineHeight: '1.6' }}>
                    {todayReport.todo.slice(0, 3).map((item, i) => (
                      <li key={i} style={{ opacity: 0.9 }}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* 気付き */}
                {todayReport.insight.length > 0 && (
                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Lightbulb size={14} />
                      <h4 style={{ margin: 0, fontSize: '11px', textTransform: 'uppercase' }}>気付き</h4>
                    </div>
                    <p style={{ margin: 0, fontSize: '11px', lineHeight: '1.6', opacity: 0.9 }}>
                      {todayReport.insight[0]}
                    </p>
                  </div>
                )}

                <Link href="/explorer?path=reports/daily" style={{ display: 'block', marginTop: '16px', fontSize: '11px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', textAlign: 'center' }}>
                  過去の日報を見る →
                </Link>
              </div>
            )}

            {/* Company Info Box */}
            <div className="amber-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Building2 size={20} color="#1f3326" />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1f3326', textTransform: 'uppercase' }}>Company</h3>
              </div>
              <h4 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#1f3326' }}>{companyInfo.companyName}</h4>
              <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#666' }}>代表: {companyInfo.ceo}</p>
              <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#999' }}>{companyInfo.address}</p>
              {companyInfo.vision && (
                <div style={{ padding: '12px', background: 'rgba(31,51,38,0.03)', borderRadius: '8px', borderLeft: '3px solid #1f3326' }}>
                  <p style={{ margin: 0, fontSize: '12px', color: '#444', lineHeight: '1.6', fontStyle: 'italic' }}>
                    「{companyInfo.vision}」
                  </p>
                </div>
              )}
            </div>

            {/* Business Ranking */}
            <div className="amber-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <TrendingUp size={20} color="#1f3326" />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1f3326', textTransform: 'uppercase' }}>事業ランキング TOP5</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {companyInfo.topBusinesses.map((biz, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: i === 0 ? 'rgba(31,51,38,0.05)' : 'transparent', borderRadius: '8px', border: i === 0 ? '1px solid rgba(31,51,38,0.1)' : 'none' }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: i === 0 ? '#1f3326' : '#eee', color: i === 0 ? '#fff' : '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>
                      {biz.rank}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1f3326' }}>{biz.name}</p>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#1f3326' }}>{biz.score}pt</span>
                  </div>
                ))}
              </div>
              <Link href="/explorer?path=株式会社Amber/事業ランキング評価.md" style={{ display: 'block', marginTop: '16px', fontSize: '12px', color: '#666', textDecoration: 'none', textAlign: 'center' }}>
                詳細を見る →
              </Link>
            </div>

            {/* Advice Box */}
            <div style={{ padding: '32px', background: '#1f3326', borderRadius: '12px', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Target size={20} color="rgba(255,255,255,0.6)" />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Strategic Advice</h3>
              </div>
              <p style={{ fontSize: '18px', fontWeight: '500', lineHeight: '1.6', marginBottom: '24px', fontStyle: 'italic' }}>
                &quot;{sasakiAdvice}&quot;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>Sasaki-san</p>
                  <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>External Advisor</p>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </main>
    </div>
  );
}
