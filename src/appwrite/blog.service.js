/* eslint-disable no-useless-catch */
import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class BlogService {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredimage, status, userId }) {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.log('Appwrite Service :: createPost :: error', error);
        }
    }

    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
        } catch (error) {
            console.log('Appwrite Service :: updatePost :: error', error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(this.appwriteDatabaseId, config.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log('Appwrite Service :: deletePost :: error', error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
        } catch (error) {
            console.log('Appwrite Service :: getPost :: error', error);
            return false;
        }
    }

    async getPosts(quories = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, quories);
        } catch (error) {
            console.log('Appwrite Service :: getPosts :: error', error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(config.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log('Appwrite Service :: uploadFile :: error', error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(config.appwriteBucketId, fileId);
        } catch (error) {
            console.log('Appwrite Service :: deleteFile :: error', error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(config.appwriteBucketId, fileId);
    }
}

const blogService = new BlogService();

export default blogService;