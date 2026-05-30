import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { MenuSection } from './models';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly api = inject(ApiService);

  readonly sections = signal<MenuSection[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  async loadMenu(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const sections = await firstValueFrom(this.api.fetchMenu());
      this.sections.set(sections);
    } catch (err) {
      this.error.set(this.messageFrom(err));
    } finally {
      this.loading.set(false);
    }
  }

  private messageFrom(err: unknown): string {
    if (err && typeof err === 'object' && 'error' in err) {
      const body = (err as { error?: { error?: string } }).error;
      if (body?.error) return body.error;
    }
    return 'Failed to load menu';
  }
}
