# Linear 運用計画：Amber 標準プロセス

## 1. チーム・プロジェクト設計
Linearの構造をAmberの組織構造に最適化します。

| レベル | Linearでの構成 | 備考 |
|:---|:---|:---|
| **事業部 (Unit)** | **Team** | 例: SaaS Division, AI Solutions |
| **プロジェクト** | **Project** | 例: Amber House, Lovable |
| **マイルストーン** | **Roadmap** | 経営レベルの節目 |

## 2. ワークフロー (Status)
Linearのデフォルトを継承しつつ、レビュー工程を明確にします。

1. **Backlog**: アイデア、将来のタスク
2. **Todo**: 次のサイクルで着手予定
3. **In Progress**: 現在実装・作業中
4. **In Review**: 成果物の確認中（Ayumuさん/佐々木様確認待ち）
5. **Done**: 完了・デプロイ済み
6. **Canceled**: 中止

## 3. 優先度とサイクル (Priority & Cycle)
ダッシュボード（Master Hub）の優先順位表示と連動させます。

*   **P1 (Urgent)**: 24時間以内に着手。最優先顧客オーダー。
*   **P2 (High)**: 現在のサイクル（1週間）で完了。
*   **P3 (Normal)**: 次のサイクル以降。
*   **Cycle**: **1週間（Mon-Sun）**。毎週月曜日に「今週やること」を確定。

## 4. ラベル・タグ設計
Master Hubでのフィルタリングを容易にします。

*   **Type**: `Bug`, `Feature`, `Improvement`, `Research`
*   **Customer Order**: `Customer: <顧客名>`（feedback.mdと紐付け）
*   **Strategic**: `Strategic`（佐々木様アドバイス関連）

## 5. Master Hub 連携ルール
「エンジニアはLinearを見ればいい、経営はMaster Hubを見ればいい」状態を作ります。

1. **Issue ID**: 既存の Markdown（AH-001 等）は Linear の Issue ID に順次移行。
2. **Feedback リンク**: `feedback.md` の「詳細リンク」に Linear Issue の URL を貼る。
3. **自動更新**: Linear で Done になると、Master Hub の進捗率が自動で上がる（後日実装予定）。

## 6. 日報との棲み分け
*   **Linear**: 「タスクの進捗」そのもの。詳細、技術議論。
*   **日報 (Markdown)**: 「気付き」「学び」「投資家向けのハイライト」。LinearのURLを引用。

---

> [!TIP]
> **「Linearにないものは存在しない」** という文化を徹底することで、情報の透明性と開発スピードを最大化します。
