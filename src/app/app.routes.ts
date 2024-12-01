import { Routes } from '@angular/router';
import { PdfComponent } from './components/pdf/pdf.component';
import { ContactComponent } from './components/contact/contact.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    {path: '', component: PdfComponent},
    // {path: 'contact', component: ContactComponent},
    // {path: 'archive', component: ArchiveComponent},
    // {path: '**', component: SettingsComponent},
];
