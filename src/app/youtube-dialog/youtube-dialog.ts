import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-youtube-dialog',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule
    
  ],
  templateUrl: './youtube-dialog.html',
  styleUrl: './youtube-dialog.scss'
})
export class YoutubeDialog {
  videoUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<YoutubeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string }
  ) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
