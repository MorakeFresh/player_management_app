import {buildSearchParamString, deleteRole, getAllRoles} from "@/lib/actions";
import Table from "@/components/table/table";
import {redirect} from "next/navigation";
import {RoleColumns} from "@/components/table/columns/role-column";
import {Role} from "@/lib/models/role";

type RoleListPageProps = {
    searchParams: { [key: string]: string | string[] | undefined };
}
export default async function RoleListPage({searchParams}: RoleListPageProps) {
    if (!searchParams['offset'] || !searchParams['limit']) {
        initialPageParams(searchParams);
    }

    const parsedOffset = parseInt(searchParams['offset'] as string);
    const parsedLimit = parseInt(searchParams['limit'] as string);

    async function getData() {
        const data = await getAllRoles(parsedOffset, parsedLimit);
        return data.data as Role[] ?? [];
    }

    async function viewClick(item: Record<string, any>) {
        'use server'
        redirect(`/role/${item.id}`);
    }

    async function deleteClick(item: Record<string, any>) {
        'use server'
        await deleteRole(item.id);
        redirect(`/role?offset=${parsedOffset}&limit=${parsedLimit}`);
    }


    return (
        <div>
            <div className="mt-4">
                <Table
                    columns={RoleColumns}
                    data={[]}
                    title="Role List"
                    onViewButtonClick={viewClick}
                    onDeleteButtonClick={deleteClick}
                    getData={getData}
                />
            </div>
        </div>
    );

    function initialPageParams(
        searchParams: { [key: string]: string | string[] | undefined }
    ) {
        if (!searchParams['offset']) {
            searchParams['offset'] = '0';
        }
        if (!searchParams['limit']) {
            searchParams['limit'] = '10';
        }
        redirect(`/role/${buildSearchParamString(searchParams)}`);
    }
}
