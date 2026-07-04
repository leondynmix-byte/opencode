# تنصيب NuX داخل OpenCode

هذا الملف يشرح تشغيل ترقية NuX داخل هذا الريبو.

## المتطلبات

- Git
- Bun 1.3.14 أو أحدث
- نظام Windows أو macOS أو Linux

## التنصيب

```bash
git clone https://github.com/leondynmix-byte/opencode.git
cd opencode
bun install
```

## التحقق

```bash
bun run nux:doctor
```

إذا كان كل شيء صحيحاً سيظهر JSON وفيه `ok: true`.

## أوامر مهمة

إنشاء خطة:

```bash
bun run nux:plan "طور المشروع واجعله أقوى"
```

فحص خطورة أمر:

```bash
bun run nux:risk "git status"
bun run nux:risk "rm -rf /"
```

حفظ درس تعلم آمن:

```bash
bun run nux:learn --goal "تجربة NuX" --outcome success --summary "تم التشغيل بنجاح"
```

عرض الذاكرة المحلية:

```bash
bun run nux:memory
```

تشغيل بنشمارك بسيط:

```bash
bun run nux:bench
bun run nux:bench --summary
```

## تنصيب سريع على Windows

```bat
install_NuX.bat
```

## تجهيز الريليس

```bat
release_NuX.bat nux-v0.1.0-alpha.1
```

بعدها أنشئ GitHub Release من الواجهة أو باستخدام GitHub CLI.

## ملفات مهمة

- `Nux.md` شرح عام.
- `configs/nux.agent.json` إعدادات NuX.
- `docs/nux-installation.md` شرح التنصيب بالإنجليزية.
- `docs/nux-release-guide.md` شرح الريليس.
- `RELEASE_NOTES_NUX.md` ملاحظات الريليس.
