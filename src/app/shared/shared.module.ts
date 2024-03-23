import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { CoverUploadComponent } from './components/cover-upload/cover-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { PillComponent } from './components/pill/pill.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { VideoUploadComponent } from './components/video-upload/video-upload.component';

const components = [
    FileUploadComponent,
    CoverUploadComponent,
    DropdownMenuComponent,
    PillComponent,
    VideoUploadComponent
  ];

@NgModule({
    declarations: [components],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    exports: [
        components,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class SharedModule
{
}
