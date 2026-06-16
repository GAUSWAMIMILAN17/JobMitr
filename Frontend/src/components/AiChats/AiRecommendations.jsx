import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Bookmark, BookMarked, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../components_lite/Navbar";
import Footer from "../components_lite/Footer";
import { CHAT_API_ENDPOINT, JOB_API_ENDPOINT } from "../../utils/data.js";
import { setAiRecommendedJobs } from "../../redux/aiSlice";
import { setStarredJobs } from "../../redux/jobSlice";

// ─── Match colour helper ──────────────────────────────────────────────────────
function matchColor(pct) {
  if (pct >= 85)
    return { bar: "#f59e0b", text: "#f59e0b", bg: "rgba(245,158,11,0.12)" };
  if (pct >= 70)
    return { bar: "#3b82f6", text: "#60a5fa", bg: "rgba(59,130,246,0.12)" };
  return { bar: "#6b7280", text: "#9ca3af", bg: "rgba(107,114,128,0.12)" };
}

// ─── Single Job Card ──────────────────────────────────────────────────────────
function JobCard({ job }) {
  const dispatch = useDispatch();
  const starredJobs = useSelector((store) => store.job.starredJobs);

  const bookmarked = starredJobs?.some(
    (savedJob) => (savedJob._id || savedJob).toString() === job._id.toString(),
  );

  const mc = matchColor(job.matchPercentage);
  const logoFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company?.name || "Co")}&background=1e3a5f&color=f59e0b&size=48&bold=true`;

  const saveButton = async () => {
    try {
      if (bookmarked) return;

      const res = await axios.post(
        `${JOB_API_ENDPOINT}/starJob/${job._id}`,
        {},
        { withCredentials: true },
      );
      if (res.data.status) {
        dispatch(setStarredJobs(res.data.starredJobs));
      }
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="jm-card">
      {/* Top row */}
      <div className="jm-card-top">
        <img
          src={job.company?.logo || logoFallback}
          alt={job.company?.name}
          className="jm-logo"
          onError={(e) => {
            e.target.src = logoFallback;
          }}
        />
        <span
          className="jm-match-pill"
          style={{ background: mc.bg, color: mc.text }}
        >
          <Sparkles size={11} style={{ marginRight: 4, display: "inline" }} />
          {job.matchPercentage}% match
        </span>
      </div>

      {/* Match bar */}
      <div className="jm-bar-track">
        <div
          className="jm-bar-fill"
          style={{ width: `${job.matchPercentage}%`, background: mc.bar }}
        />
      </div>

      {/* Title & company */}
      <h3 className="jm-title">{job.title}</h3>
      <p className="jm-company">
        {job.company?.name}
        {job.location && (
          <span className="jm-company-loc"> · {job.location}</span>
        )}
      </p>

      {/* AI Reason */}
      <div className="jm-reason">
        <Sparkles size={13} className="jm-reason-icon" />
        <span>{job.reason}</span>
      </div>

      {/* Skills */}
      {job.requirements?.length > 0 && (
        <div className="jm-skills">
          {job.requirements.slice(0, 4).map((r, i) => (
            <span key={i} className="jm-skill">
              {r}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="jm-actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            saveButton();
          }}
          className={`jm-save-btn ${bookmarked ? "jm-save-btn--saved" : ""}`}
        >
          {bookmarked ? <BookMarked size={15} /> : <Bookmark size={15} />}
          {bookmarked ? "Saved" : "Save"}
        </button>
        <Link to={`/description/${job._id}`} className="jm-apply-btn">
          Apply Now <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return <span className="jm-spinner" />;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AiRecommendations() {
  const dispatch = useDispatch();
  const { aiRecomendedJobs } = useSelector((store) => store.aiRecommendedJobs);
  const {user} = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Derived from Redux, not a separate flag — so data already in the store
  // (e.g. after a page refresh) shows the results view immediately.
  const fetched = aiRecomendedJobs.length > 0;

  async function fetchJobs() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${CHAT_API_ENDPOINT}/aiRecommendations`, {
        withCredentials: true,
      });
      if (res.data?.success) {
        dispatch(setAiRecommendedJobs(res.data.jobs || []));
      } else {
        setError(res.data?.message || "Couldn't load recommendations.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Couldn't load recommendations. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if(!user){
        dispatch(setAiRecommendedJobs([]));
    }
  }, [user])
  return (
    <>
      <Navbar />
      <style>{CSS}</style>
      <div className="jm-page">
        {/* ── Hero / CTA ── */}
        {!fetched && (
          <section className="jm-hero">
            <p className="jm-eyebrow">
              Powered by JobMitra AI · Matched to your profile
            </p>
            <h1 className="jm-hero-title">
              Your next Skill Match Jobs
              <br />
              <span className="jm-hero-accent">in one click away</span>
            </h1>
            <p className="jm-hero-sub">
              JobMitra analyses your skills and surfaces the roles where you
              have the highest chance of success.
            </p>
            <button className="jm-cta" onClick={fetchJobs} disabled={loading}>
              {loading ? (
                <>
                  <Spinner /> Finding your matches…
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Show AI Recommendations
                </>
              )}
            </button>
            {error && <p className="jm-error">{error}</p>}
          </section>
        )}

        {/* ── Results ── */}
        {fetched && (
          <main className="jm-main">
            <div className="jm-results-header">
              <div>
                <h2 className="jm-results-title">Your Recommendations</h2>
                <p className="jm-results-sub">
                  {aiRecomendedJobs.length} roles matched to your profile
                </p>
              </div>
              <button
                className="jm-refresh"
                onClick={fetchJobs}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner /> Refreshing…
                  </>
                ) : (
                  "↻ Refresh"
                )}
              </button>
            </div>
            {error && <p className="jm-error">{error}</p>}

            {aiRecomendedJobs.length === 0 ? (
              <p className="jm-empty">
                No matching jobs found right now. Try refreshing.
              </p>
            ) : (
              <div className="jm-grid">
                {aiRecomendedJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </main>
        )}
      </div>
      <Footer />
    </>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  .jm-page {
    min-height: 100vh;
    background: #0b1829;
    font-family: 'Inter', system-ui, sans-serif;
    color: #e2e8f0;
  }

  /* ── Hero ── */
  .jm-hero {
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 24px;
  }
  .jm-eyebrow {
    font-size: 11px;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: #f59e0b;
    font-weight: 600;
    margin-bottom: 18px;
  }
  .jm-hero-title {
    font-size: clamp(40px, 7vw, 68px);
    font-weight: 800;
    line-height: 1.1;
    color: #fff;
    letter-spacing: -1.5px;
    margin: 0 0 16px;
  }
  .jm-hero-accent {
    color: #f59e0b;
  }
  .jm-hero-sub {
    font-size: 17px;
    color: #64748b;
    max-width: 440px;
    line-height: 1.65;
    margin-bottom: 36px;
  }
  .jm-cta {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: #f59e0b;
    color: #0f1f35;
    border: none;
    border-radius: 12px;
    padding: 15px 34px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: -.2px;
    box-shadow: 0 6px 28px rgba(245,158,11,.35);
    transition: background .15s, transform .15s, box-shadow .15s;
  }
  .jm-cta:hover:not(:disabled) {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 10px 32px rgba(245,158,11,.45);
  }
  .jm-cta:disabled { opacity: .65; cursor: not-allowed; }

  .jm-error { color: #f87171; font-size: 13px; margin-top: 12px; }
  .jm-empty { color: #475569; font-size: 14px; text-align: center; padding: 60px 0; }

  /* ── Results header ── */
  .jm-main { max-width: 1120px; margin: 0 auto; padding: 44px 24px 80px; }
  .jm-results-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .jm-results-title { font-size: 22px; font-weight: 700; color: #fff; margin: 0; }
  .jm-results-sub { font-size: 13px; color: #475569; margin: 4px 0 0; }
  .jm-refresh {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 9px;
    padding: 9px 18px;
    font-size: 13px;
    color: #94a3b8;
    cursor: pointer;
    font-weight: 500;
    transition: background .15s, color .15s;
  }
  .jm-refresh:hover:not(:disabled) { background: rgba(255,255,255,.09); color: #fff; }
  .jm-refresh:disabled { opacity: .55; cursor: not-allowed; }

  /* ── Grid ── */
  .jm-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    gap: 20px;
  }

  /* ── Card ── */
  .jm-card {
    background: #0f1f35;
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 18px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 11px;
    transition: border-color .18s, transform .18s;
  }
  .jm-card:hover {
    border-color: rgba(245,158,11,.3);
    transform: translateY(-2px);
  }

  .jm-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .jm-logo {
    width: 46px; height: 46px;
    border-radius: 11px;
    object-fit: contain;
    background: #1e3a5f;
    padding: 4px;
  }

  .jm-match-pill {
    border-radius: 20px;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  /* Match bar */
  .jm-bar-track {
    height: 3px;
    background: rgba(255,255,255,.07);
    border-radius: 99px;
    overflow: hidden;
  }
  .jm-bar-fill {
    height: 100%;
    border-radius: 99px;
    transition: width .6s ease;
  }

  .jm-title {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    margin: 0;
    line-height: 1.35;
  }
  .jm-company { font-size: 13px; color: #f59e0b; font-weight: 600; margin: 0; }
  .jm-company-loc { color: #475569; font-weight: 400; }

  .jm-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin: 0; }

  /* AI reason */
  .jm-reason {
    display: flex;
    align-items: flex-start;
    gap: 7px;
    background: rgba(245,158,11,.07);
    border: 1px solid rgba(245,158,11,.15);
    border-radius: 9px;
    padding: 9px 11px;
    font-size: 12px;
    color: #fbbf24;
    line-height: 1.5;
  }
  .jm-reason-icon { color: #f59e0b; flex-shrink: 0; margin-top: 1px; }

  .jm-skills { display: flex; flex-wrap: wrap; gap: 5px; }
  .jm-skill {
    background: rgba(59,130,246,.1);
    border: 1px solid rgba(59,130,246,.2);
    border-radius: 6px;
    padding: 3px 8px;
    font-size: 11px;
    color: #93c5fd;
    font-weight: 500;
  }

  /* Action buttons */
  .jm-actions {
    display: flex;
    gap: 8px;
    margin-top: 4px;
    padding-top: 12px;
    border-top: 1px solid rgba(255,255,255,.06);
  }
  .jm-save-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 9px;
    padding: 8px 16px;
    font-size: 13px;
    color: #94a3b8;
    cursor: pointer;
    font-weight: 500;
    transition: all .15s;
    font-family: inherit;
  }
  .jm-save-btn:hover { background: rgba(255,255,255,.09); color: #e2e8f0; }
  .jm-save-btn--saved {
    background: rgba(245,158,11,.1);
    border-color: rgba(245,158,11,.3);
    color: #f59e0b;
  }
  .jm-apply-btn {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: #f59e0b;
    color: #0f1f35;
    border: none;
    border-radius: 9px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: background .15s, transform .15s;
    font-family: inherit;
  }
  .jm-apply-btn:hover {
    background: #fbbf24;
    transform: translateY(-1px);
  }

  /* Spinner */
  .jm-spinner {
    display: inline-block;
    width: 14px; height: 14px;
    border-radius: 50%;
    border: 2px solid rgba(15,31,53,.3);
    border-top-color: #0f1f35;
    animation: jm-spin .65s linear infinite;
    flex-shrink: 0;
  }
  .jm-refresh .jm-spinner { border-color: rgba(255,255,255,.15); border-top-color: #94a3b8; }

  @keyframes jm-spin { to { transform: rotate(360deg); } }

  @media (max-width: 600px) {
    .jm-grid { grid-template-columns: 1fr; }
    .jm-hero-title { font-size: 36px; }
  }
`;