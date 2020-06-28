import { computed } from 'mobx';
import ProjectStore from './ProjectStore';

class Root {
    @computed get docTitle(): string {
        if (!ProjectStore.documentTitle) {
            return '西安科技大学校软件实验室';
        }
        if (!ProjectStore.pageName) {
            return ProjectStore.documentTitle;
        }
        return `${ProjectStore.documentTitle}/${ProjectStore.pageName}`;
    }
}

export default new Root();
