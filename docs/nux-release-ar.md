# شرح عمل Release لنسخة NuX

هذا الملف يشرح طريقة تجهيز وإصدار نسخة NuX من هذا الريبو.

## اسم الإصدار المقترح

```text
nux-v0.1.0-alpha.1
```

## قبل الريليس

شغل الأوامر التالية من جذر المشروع:

```bash
bun install
bun run nux:doctor
bun run nux:plan "release readiness"
bun run nux:risk "git status"
bun run nux:bench
bun run nux:bench --summary
bun --cwd packages/nux run typecheck
```

## على Windows

```bat
release_NuX.bat nux-v0.1.0-alpha.1
```

هذا السكربت يفحص NuX ويجهز Tag محلياً.

## رفع التاغ

```bash
git push origin nux-v0.1.0-alpha.1
```

## إنشاء GitHub Release من الواجهة

1. افتح صفحة الريبو في GitHub.
2. ادخل إلى Releases.
3. اضغط Draft a new release.
4. اختر أو أنشئ Tag باسم `nux-v0.1.0-alpha.1`.
5. العنوان:

```text
NuX Agent Upgrade v0.1.0-alpha.1
```

6. انسخ محتوى `RELEASE_NOTES_NUX.md` في الوصف.
7. فعّل خيار Pre-release لأنها نسخة Alpha.
8. اضغط Publish release.

## بعد الريليس

- افتح نسخة نظيفة من الريبو.
- شغل `bun install`.
- شغل `bun run nux:doctor`.
- تأكد أن كل شيء يعمل.
