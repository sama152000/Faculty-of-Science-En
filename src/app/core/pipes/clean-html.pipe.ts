// import { Pipe, PipeTransform, inject, PLATFORM_ID } from '@angular/core';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { isPlatformBrowser } from '@angular/common';

// interface CleanHtmlOptions {
//   stripStyles?: boolean;
//   stripClasses?: boolean;
//   removeEmptyTags?: boolean;
//   preserveLineBreaks?: boolean;
// }

// @Pipe({
//   name: 'cleanHtml',
//   standalone: true,
//   pure: true,
// })
// export class CleanHtmlPipe implements PipeTransform {
//   private readonly sanitizer = inject(DomSanitizer);
//   private readonly platformId = inject(PLATFORM_ID);

//   transform(
//     value: string | null | undefined,
//     options: CleanHtmlOptions = {}
//   ): SafeHtml {
//     if (!value) {
//       return this.sanitizer.bypassSecurityTrustHtml('');
//     }

//     const config: Required<CleanHtmlOptions> = {
//       stripStyles: true,
//       stripClasses: true,
//       removeEmptyTags: true,
//       preserveLineBreaks: false,
//       ...options,
//     };

//     let html = value;

//     // ==============================
//     // 1. Decode & Normalize
//     // ==============================
//     html = html.replace(/&nbsp;/gi, ' ').replace(/\u00A0/g, ' ');

//     // ==============================
//     // 2. Remove Dangerous Stuff (XSS-lite)
//     // ==============================
//     html = html
//       .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
//       .replace(/on\w+="[^"]*"/gi, '')
//       .replace(/javascript:/gi, '');

//     // ==============================
//     // 3. Strip Quill Artifacts
//     // ==============================
//     if (config.stripClasses) {
//       html = html.replace(/class="[^"]*ql-[^"]*"/gi, '');
//     }

//     if (config.stripStyles) {
//       html = html.replace(/style="[^"]*"/gi, '');
//     }

//     // ==============================
//     // 4. Remove Empty Tags
//     // ==============================
//     if (config.removeEmptyTags) {
//       html = html.replace(/<(\w+)[^>]*>\s*<\/\1>/g, '');
//       html = html.replace(/<p><br><\/p>/gi, '');
//     }

//     // ==============================
//     // 5. Spacing Cleanup
//     // ==============================
//     html = html
//       .replace(/>\s+</g, '><')
//       .replace(/\s{2,}/g, ' ')
//       .trim();

//     // ==============================
//     // 6. Optional Line Break Preservation
//     // ==============================
//     if (config.preserveLineBreaks) {
//       html = html.replace(/<\/p>/gi, '</p>\n');
//     }

//     // ==============================
//     // 7. SSR Safe Guard
//     // ==============================
//     if (!isPlatformBrowser(this.platformId)) {
//       return html as any;
//     }

//     // ==============================
//     // 8. Mark As Safe for Angular
//     // ==============================
//     return this.sanitizer.bypassSecurityTrustHtml(html);
//   }
// }

import { Pipe, PipeTransform } from '@angular/core';

/*
استخدام احترافي في الـ Template 🧠
تنظيف عادي
<div [innerHTML]="post.content | cleanHtml"></div>

تنظيف مخصص (عرض فقط – بدون styles & classes)
<div
  [innerHTML]="post.content | cleanHtml:{ stripStyles: true, stripClasses: true }"
></div>

لو عايز تحافظ على الأسطر
<div
  [innerHTML]="post.content | cleanHtml:{ preserveLineBreaks: true }"
></div>

*/
interface CleanHtmlOptions {
  stripStyles?: boolean;
  stripClasses?: boolean;
  removeEmptyTags?: boolean;
  preserveLineBreaks?: boolean;
}

@Pipe({
  name: 'cleanHtml',
  standalone: true,
  pure: true,
})
export class CleanHtmlPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    options: CleanHtmlOptions = {}
  ): string {
    if (!value) return '';

    const config: Required<CleanHtmlOptions> = {
      stripStyles: true,
      stripClasses: true,
      removeEmptyTags: true,
      preserveLineBreaks: false,
      ...options,
    };

    let html = value;

    // ==============================
    // 1. Decode & Normalize
    // ==============================
    html = html.replace(/&nbsp;/gi, ' ').replace(/\u00A0/g, ' ');

    // ==============================
    // 2. Remove Dangerous Stuff (XSS-lite)
    // ==============================
    html = html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '');

    // ==============================
    // 3. Strip Quill Artifacts
    // ==============================
    if (config.stripClasses) {
      html = html.replace(/class="[^"]*ql-[^"]*"/gi, '');
    }

    if (config.stripStyles) {
      html = html.replace(/style="[^"]*"/gi, '');
    }

    // ==============================
    // 4. Remove Empty Tags
    // ==============================
    if (config.removeEmptyTags) {
      html = html.replace(/<(\w+)[^>]*>\s*<\/\1>/g, '');
      html = html.replace(/<p><br><\/p>/gi, '');
    }

    // ==============================
    // 5. Spacing Cleanup
    // ==============================
    html = html
      .replace(/>\s+</g, '><')
      .replace(/\s{2,}/g, ' ')
      .trim();

    // ==============================
    // 6. Optional Line Break Preservation
    // ==============================
    if (config.preserveLineBreaks) {
      html = html.replace(/<\/p>/gi, '</p>\n');
    }

    return html;
  }
}
